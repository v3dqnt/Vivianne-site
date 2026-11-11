import { useEffect, useRef, useState } from 'react';
import { useSfx } from '../sound/SoundProvider';

const BOOT = [
  'init 0nine.labs',
  'loading inference kernels ......... ok',
  'calibrating compute budget ........ ok',
  'searching beyond transformers ..... pending'
];

// Entry screen. Browsers only allow audio after a user gesture, so this click
// is what unlocks the sound layer for the rest of the visit.
export default function Gate({ onEnter }) {
  const { choose, play, savedPref } = useSfx();
  const [leaving, setLeaving] = useState(false);
  const soundButton = useRef(null);
  const silentButton = useRef(null);

  useEffect(() => {
    (savedPref === 'off' ? silentButton : soundButton).current?.focus({ preventScroll: true });
  }, [savedPref]);

  const enter = withSound => {
    if (leaving) return;
    choose(withSound);
    setLeaving(true);
    if (withSound) {
      play('boot');
      setTimeout(() => play('reveal'), 650);
    }
    setTimeout(onEnter, 700);
  };

  return (
    <div className={`gate${leaving ? ' gate--leaving' : ''}`} role="dialog" aria-modal="true" aria-label="Enter 0nine Labs">
      <div className="gate__inner">
        <div className="gate__mark" aria-hidden="true">
          09
        </div>
        <pre className="gate__boot" aria-hidden="true">
          {BOOT.map((line, i) => (
            <span key={line} style={{ animationDelay: `${0.25 + i * 0.35}s` }}>
              <i>&gt;</i> {line}
            </span>
          ))}
        </pre>
        <p className="gate__lede">This site is built to be heard. Headphones recommended.</p>
        <div className="gate__actions">
          <button ref={soundButton} className="btn btn--primary" onClick={() => enter(true)}>
            <span className="eq" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Enter with sound
          </button>
          <button ref={silentButton} className="btn btn--ghost" onClick={() => enter(false)}>
            Enter silent
          </button>
        </div>
      </div>
    </div>
  );
}
