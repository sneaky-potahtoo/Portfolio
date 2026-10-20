import { useEffect, useState } from 'react';

type LightState = 'dim' | 'flickering' | 'on';

const DIM_IMAGE = '/cabin-dim.png';
const LIGHT_IMAGE = '/cabin-light-layer.png';
const STARTUP_DELAY_MS = 400;
const FLICKER_DURATION_MS = 1750;

// Module scope lasts for one document load, even if React remounts this view.
let startupStarted = false;

function decodeImage(src: string): Promise<void> {
  const image = new Image();
  image.src = src;
  return image.decode();
}

interface CabinLightBackgroundProps {
  isLoaded: boolean;
}

export function CabinLightBackground({ isLoaded }: CabinLightBackgroundProps) {
  const [lightState, setLightState] = useState<LightState>(
    startupStarted ? 'on' : 'dim',
  );

  useEffect(() => {
    if (!isLoaded) return;
    if (startupStarted) return;

    let cancelled = false;
    let readyFrame = 0;
    let paintFrame = 0;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;

    Promise.all([decodeImage(DIM_IMAGE), decodeImage(LIGHT_IMAGE)])
      .then(() => {
        if (cancelled) return;
        // Let the decoded photographs and newly visible hero content paint.
        readyFrame = requestAnimationFrame(() => {
          paintFrame = requestAnimationFrame(() => {
            if (cancelled || startupStarted) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              startupStarted = true;
              setLightState('on');
              return;
            }
            startTimer = setTimeout(() => {
              if (cancelled || startupStarted) return;
              startupStarted = true;
              setLightState('flickering');
              finishTimer = setTimeout(() => {
                if (!cancelled) setLightState('on');
              }, FLICKER_DURATION_MS);
            }, STARTUP_DELAY_MS);
          });
        });
      })
      .catch(() => {
        // Leave the dim master image visible if an image fails to decode.
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(readyFrame);
      cancelAnimationFrame(paintFrame);
      clearTimeout(startTimer);
      clearTimeout(finishTimer);
    };
  }, [isLoaded]);

  return (
    <>
      <img
        src={DIM_IMAGE}
        alt="Misty cabin in a pine forest at dusk"
        className="absolute inset-0 w-full h-full object-cover crisp-img"
        loading="eager"
        fetchPriority="high"
      />
      <img
        src={LIGHT_IMAGE}
        alt=""
        aria-hidden="true"
        data-cabin-light
        data-light-state={lightState}
        className="absolute inset-0 w-full h-full object-cover crisp-img cabin-light-layer"
        loading="eager"
      />
    </>
  );
}
