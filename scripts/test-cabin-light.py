"""Check that the baked layer brightens the cabin without changing the scene."""

from pathlib import Path
from PIL import Image
import numpy as np

PUBLIC = Path(__file__).resolve().parents[1] / "public"
dim = np.asarray(Image.open(PUBLIC / "cabin-dim.png").convert("RGB"), dtype=np.float32)
layer = np.asarray(Image.open(PUBLIC / "cabin-light-layer.png").convert("RGBA"), dtype=np.float32)
assert dim.shape == (941, 1672, 3)
assert layer.shape == (941, 1672, 4)

alpha = layer[:, :, 3] / 255
assert not np.any(alpha[:504])  # Roof, sky, fog, and forest stay on the master.
assert not np.any(alpha[:, :400])
assert not np.any(alpha[:, 1040:])
assert not np.any(alpha[750:])

for x, y in [(500, 540), (660, 540), (740, 535), (820, 535), (955, 540)]:
    assert alpha[y, x] > 0.6, (x, y, alpha[y, x])

lit = dim * (1 - alpha[:, :, None]) + layer[:, :, :3] * alpha[:, :, None]
assert lit[540, 740, 0] > dim[540, 740, 0] + 20
assert np.array_equal(lit[200, 500], dim[200, 500])
print("Cabin lighting asset checks passed")
