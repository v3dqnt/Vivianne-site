"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VolumeHighIcon, VolumeOffIcon } from "@hugeicons/core-free-icons";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { playSound, preloadSound, setSoundMuted } from "@/lib/sound/react-bits-sound";
import dissolve from "@/lib/sound/dissolve";
import reveal from "@/lib/sound/reveal";
import shimmer from "@/lib/sound/shimmer";

gsap.registerPlugin(ScrollTrigger);

const MUTE_KEY = "viv-sound-muted";
const REVEAL_KEY = "viv-sound-revealed";
const REVEAL_WINDOW_MS = 20_000;
const SHIMMER_GAP_MS = 3_000;

const read = (store: () => Storage, key: string) => {
  try {
    return store().getItem(key);
  } catch {
    return null;
  }
};

const write = (store: () => Storage, key: string, value: string) => {
  try {
    store().setItem(key, value);
  } catch {
    // Blocked storage only costs the remembered choice.
  }
};

// The mute choice, shared by the toggle and the player without a provider.
const listeners = new Set<() => void>();
let muted = false;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const setMuted = (value: boolean) => {
  muted = value;
  setSoundMuted(value);
  write(() => localStorage, MUTE_KEY, value ? "1" : "0");
  listeners.forEach((listener) => listener());
};

/** Browsers keep audio silent until the first gesture, unless the visitor is already trusted. */
let unlocked = false;

const play = (recipe: Parameters<typeof playSound>[0]) => {
  if (unlocked) playSound(recipe).catch(() => undefined);
};

/**
 * The site's sounds (React Bits Sound Lab): `reveal` when the site first
 * opens, `dissolve` as the chrome hero melts into the silver page, `shimmer`
 * when the pointer catches a metal card or the page reaches the beams.
 */
export function SiteSound() {
  const pathname = usePathname();

  useEffect(() => {
    muted = read(() => localStorage, MUTE_KEY) === "1";
    setSoundMuted(muted);
    listeners.forEach((listener) => listener());

    const opened = performance.now();
    const playReveal = () => {
      if (read(() => sessionStorage, REVEAL_KEY)) return;
      write(() => sessionStorage, REVEAL_KEY, "1");
      play(reveal);
    };

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      for (const type of GESTURES) window.removeEventListener(type, unlock);
      [reveal, dissolve, shimmer].forEach((recipe) => preloadSound(recipe));
      // A late first click should not set off a swell out of nowhere.
      if (performance.now() - opened < REVEAL_WINDOW_MS) playReveal();
    };

    // Some browsers already allow audio for a site the visitor returns to.
    const probe = new AudioContext();
    if (probe.state === "running") unlock();
    probe.close().catch(() => undefined);
    if (unlocked) return;

    for (const type of GESTURES) window.addEventListener(type, unlock, { passive: true });
    return () => {
      for (const type of GESTURES) window.removeEventListener(type, unlock);
    };
  }, []);

  useEffect(() => {
    let last = 0;
    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element).closest?.("[data-shimmer]");
      if (!card || card.contains(event.relatedTarget as Node | null)) return;
      const now = performance.now();
      if (now - last < SHIMMER_GAP_MS) return;
      last = now;
      play(shimmer);
    };
    document.addEventListener("pointerover", onOver);

    const ctx = gsap.context(() => {
      const hero = document.querySelector("[data-sound-dissolve]");
      if (hero) ScrollTrigger.create({ trigger: hero, start: "bottom 60%", onLeave: () => play(dissolve) });
      const beams = document.querySelector("[data-sound-shimmer]");
      if (beams) ScrollTrigger.create({ trigger: beams, start: "top 60%", onEnter: () => play(shimmer) });
    });
    return () => {
      document.removeEventListener("pointerover", onOver);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

const GESTURES = ["pointerdown", "keydown", "touchend"] as const;

export function SoundToggle() {
  const isMuted = useSyncExternalStore(
    subscribe,
    () => muted,
    () => false,
  );

  return (
    <button
      type="button"
      aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
      aria-pressed={!isMuted}
      onClick={() => setMuted(!isMuted)}
      className={buttonVariants({
        variant: "ghost",
        size: "icon",
      })}
    >
      <Icon icon={isMuted ? VolumeOffIcon : VolumeHighIcon} size={18} />
    </button>
  );
}
