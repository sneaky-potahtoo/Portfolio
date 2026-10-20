"""Bake the bright cabin photo into a transparent, lighting-only layer.

Requires Pillow and NumPy. Run from the repository root. Both source frames
are 1672 x 941. The dim image is the permanent master frame on the website.
"""

from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "cabin"
PUBLIC = ROOT / "public"
SIZE = (1672, 941)


def soft_zone(draw_fn, radius):
    mask = Image.new("L", SIZE)
    draw_fn(ImageDraw.Draw(mask))
    return np.asarray(mask.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32) / 255


def main():
    dim_image = Image.open(SOURCE / "dim-source.png").convert("RGB")
    on_image = Image.open(SOURCE / "on-source.png").convert("RGB")
    if dim_image.size != SIZE or on_image.size != SIZE:
        raise ValueError("Both cabin photographs must be 1672 x 941")

    dim = np.asarray(dim_image, dtype=np.float32)
    on = np.asarray(on_image, dtype=np.float32)

    # The unchanged roof, chimney, and railing edges line up best when the
    # supplied ON frame is translated one source pixel left.
    on = np.concatenate((on[:, 1:], on[:, -1:]), axis=1)

    def draw_windows(d):
        for box in [
            (451, 516, 550, 565),  # left window
            (631, 513, 851, 619),  # glass doors and interior
            (931, 512, 977, 570),  # right window
        ]:
            d.rectangle(box, fill=255)

    windows = soft_zone(draw_windows, 1.2)

    def draw_reflections(d):
        # Soft masks follow the real lit porch and near-ground areas. Their
        # warmth is selected from the actual bright/dim pixel difference.
        d.ellipse((570, 555, 996, 652), fill=205)
        d.ellipse((460, 627, 1026, 746), fill=230)
        d.ellipse((433, 503, 575, 596), fill=120)
        d.ellipse((919, 501, 1004, 616), fill=110)

    reflections = soft_zone(draw_reflections, 13)

    # Warm chroma gain isolates real lamp light from minor exposure/fog and
    # registration differences in the supplied photographs.
    red_gain = on[:, :, 0] - dim[:, :, 0]
    blue_gain = on[:, :, 2] - dim[:, :, 2]
    chroma_gain = red_gain - 0.35 * blue_gain
    smooth_gain = np.asarray(
        Image.fromarray(np.uint8(np.clip(chroma_gain + 128, 0, 255))).filter(
            ImageFilter.GaussianBlur(1.5)
        ),
        dtype=np.float32,
    ) - 128

    interior_alpha = windows * np.clip((smooth_gain - 2) / 18, 0, 1)
    reflected_alpha = reflections * np.clip((smooth_gain - 4) / 26, 0, 1)
    alpha = np.maximum(interior_alpha, reflected_alpha)

    # Hard limits keep every pixel of sky, forest, roof, and distant ground
    # permanently sourced from the dim master frame, including blur tails.
    alpha[:504] = 0
    alpha[750:] = 0
    alpha[:, :400] = 0
    alpha[:, 1040:] = 0
    rgba = np.dstack((on.astype(np.uint8), np.uint8(np.rint(alpha * 255))))

    dim_image.save(PUBLIC / "cabin-dim.png", optimize=True)
    Image.fromarray(rgba, "RGBA").save(PUBLIC / "cabin-light-layer.png", optimize=True)


if __name__ == "__main__":
    main()
