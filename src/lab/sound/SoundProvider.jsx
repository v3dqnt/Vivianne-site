import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { playSound, preloadSound } from '../components/sounds/react-bits-sound';
import nib from '../components/sounds/nib';
import pebble from '../components/sounds/pebble';
import tink from '../components/sounds/tink';
import tab from '../components/sounds/tab';
import popover from '../components/sounds/popover';
import glide from '../components/sounds/glide';
import glint from '../components/sounds/glint';
import data from '../components/sounds/data';
import scramble from '../components/sounds/scramble';
import bitflip from '../components/sounds/bitflip';
import zap from '../components/sounds/zap';
import dawn from '../components/sounds/dawn';
import dusk from '../components/sounds/dusk';
import reveal from '../components/sounds/reveal';
import circuit from '../components/sounds/circuit';
import swell from '../components/sounds/swell';
import shimmer from '../components/sounds/shimmer';
import clasp from '../components/sounds/clasp';
import unclasp from '../components/sounds/unclasp';
import chiclet from '../components/sounds/chiclet';
import enter from '../components/sounds/enter';
import counter from '../components/sounds/counter';
import dispatch from '../components/sounds/dispatch';

// Named cues used across the site. Volumes are in dB relative to each sound's own level.
const CUES = {
  hover: { recipe: nib, tune: { volume: -10, variation: 0.6 } },
  click: { recipe: pebble, tune: { volume: -4 } },
  link: { recipe: tink, tune: { volume: -8, variation: 0.4 } },
  nav: { recipe: tab, tune: { volume: -6 } },
  open: { recipe: popover, tune: { volume: -6 } },
  select: { recipe: glide, tune: { volume: -6 } },
  section: { recipe: glint, tune: { volume: -14 } },
  data: { recipe: data, tune: { volume: -12 } },
  decode: { recipe: scramble, tune: { volume: -10 } },
  glitch: { recipe: bitflip, tune: { volume: -8, variation: 0.8 } },
  zap: { recipe: zap, tune: { volume: -12, variation: 0.6 } },
  boot: { recipe: dawn, tune: { volume: -2 } },
  shutdown: { recipe: dusk, tune: { volume: -4 } },
  reveal: { recipe: reveal, tune: { volume: -6 } },
  sting: { recipe: circuit, tune: { volume: -6 } },
  swell: { recipe: swell, tune: { volume: -10 } },
  shimmer: { recipe: shimmer, tune: { volume: -10 } },
  on: { recipe: clasp, tune: { volume: -4 } },
  off: { recipe: unclasp, tune: { volume: -4 } },
  key: { recipe: chiclet, tune: { volume: -12, variation: 0.3 } },
  enter: { recipe: enter, tune: { volume: -8 } },
  count: { recipe: counter, tune: { volume: -12 } },
  send: { recipe: dispatch, tune: { volume: -4 } }
};

// Throttle windows per cue so fast pointer movement doesn't machine-gun the same sound.
const THROTTLE = { hover: 70, key: 35, glitch: 120, zap: 180, section: 400 };

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  // Sound starts off: browsers only allow audio after a gesture, and the visitor turns it on from the nav.
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const lastPlayed = useRef({});

  const play = useCallback(name => {
    if (!enabledRef.current) return;
    const cue = CUES[name];
    if (!cue) return;
    const wait = THROTTLE[name];
    if (wait) {
      const now = performance.now();
      if (now - (lastPlayed.current[name] ?? 0) < wait) return;
      lastPlayed.current[name] = now;
    }
    playSound(cue.recipe, cue.tune).catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    if (next) Object.values(CUES).forEach(cue => preloadSound(cue.recipe, cue.tune));
    const cue = next ? CUES.on : CUES.off;
    playSound(cue.recipe, cue.tune).catch(() => {});
    enabledRef.current = next;
    setEnabled(next);
  }, []);

  const value = useMemo(() => ({ enabled, play, toggle }), [enabled, play, toggle]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export const useSfx = () => useContext(SoundContext);

// Spread onto interactive elements: <a {...sfx('link')}>
export function useSfxProps() {
  const { play } = useSfx();
  return useCallback(
    (clickCue = 'click', hoverCue = 'hover') => ({
      onPointerEnter: hoverCue ? () => play(hoverCue) : undefined,
      onFocus: hoverCue ? () => play(hoverCue) : undefined,
      onClick: clickCue ? () => play(clickCue) : undefined
    }),
    [play]
  );
}
