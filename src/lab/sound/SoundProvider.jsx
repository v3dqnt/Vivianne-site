import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { playSound, preloadSound, renderSound } from '../components/sounds/react-bits-sound';
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
import nebula from '../components/sounds/nebula';

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

const STORAGE_KEY = '09-sound';
const AMBIENT_LOOP = 7; // seconds between pad starts; the pad's own 2.5s fades cross over
const AMBIENT_GAIN = 0.32;

const SoundContext = createContext(null);

const readPref = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writePref = value => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable, preference just won't persist */
  }
};

// The ambient bed runs on its own AudioContext so it can be faded and stopped,
// which the engine's fire-and-forget playSound() can't do.
function useAmbient(active) {
  const ref = useRef({ context: null, master: null, buffer: null, timer: 0, sources: new Set() });

  useEffect(() => {
    const state = ref.current;
    if (!active) {
      if (state.master && state.context) {
        const now = state.context.currentTime;
        state.master.gain.cancelScheduledValues(now);
        state.master.gain.setTargetAtTime(0, now, 0.4);
      }
      clearInterval(state.timer);
      state.timer = 0;
      return undefined;
    }

    let cancelled = false;
    const start = async () => {
      if (!state.context) {
        const Context = window.AudioContext || window.webkitAudioContext;
        state.context = new Context();
        state.master = state.context.createGain();
        state.master.gain.value = 0;
        state.master.connect(state.context.destination);
      }
      if (state.context.state === 'suspended') await state.context.resume();
      if (!state.buffer) state.buffer = await renderSound(nebula, {}, { sampleRate: state.context.sampleRate });
      if (cancelled) return;

      const spawn = () => {
        const source = state.context.createBufferSource();
        source.buffer = state.buffer;
        source.detune.value = (Math.random() * 2 - 1) * 30;
        source.connect(state.master);
        source.onended = () => state.sources.delete(source);
        state.sources.add(source);
        source.start();
      };
      const now = state.context.currentTime;
      state.master.gain.cancelScheduledValues(now);
      state.master.gain.setTargetAtTime(AMBIENT_GAIN, now, 1.2);
      spawn();
      state.timer = setInterval(spawn, AMBIENT_LOOP * 1000);
    };
    start().catch(() => {});

    return () => {
      cancelled = true;
      clearInterval(state.timer);
      state.timer = 0;
    };
  }, [active]);

  useEffect(
    () => () => {
      const state = ref.current;
      clearInterval(state.timer);
      state.sources.forEach(source => {
        try {
          source.stop();
        } catch {
          /* already stopped */
        }
      });
      state.context?.close();
    },
    []
  );
}

export function SoundProvider({ children }) {
  // null = visitor hasn't chosen yet (gate is showing)
  const [enabled, setEnabled] = useState(null);
  const [ambient, setAmbient] = useState(true);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  const lastPlayed = useRef({});

  useAmbient(enabled === true && ambient);

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

  // Called from the entry gate, inside a user gesture, so audio is allowed to start.
  const choose = useCallback(withSound => {
    enabledRef.current = withSound;
    setEnabled(withSound);
    writePref(withSound ? 'on' : 'off');
    if (withSound) Object.values(CUES).forEach(cue => preloadSound(cue.recipe, cue.tune));
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    writePref(next ? 'on' : 'off');
    if (next) Object.values(CUES).forEach(cue => preloadSound(cue.recipe, cue.tune));
    const cue = next ? CUES.on : CUES.off;
    playSound(cue.recipe, cue.tune).catch(() => {});
    enabledRef.current = next;
    setEnabled(next);
  }, []);

  const value = useMemo(
    () => ({
      enabled: enabled === true,
      chosen: enabled !== null,
      savedPref: readPref(),
      ambient,
      setAmbient,
      play,
      choose,
      toggle
    }),
    [enabled, ambient, play, choose, toggle]
  );

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
