import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks';

const LAST = 9;
const COUNT_MS = 1800; // 00 → 09, slowing toward the end
const HOLD_MS = 350; // rests on 09 before the page opens
const LEAVE_MS = 700; // matches the fade in the stylesheet

// Shown on arrival: the mark counts up to 09, then the site opens.
export default function Loader({ onDone }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const quick = prefersReducedMotion();
    const count = quick ? 200 : COUNT_MS;
    const timers = [];
    if (quick) {
      setN(LAST);
    } else {
      for (let i = 1; i <= LAST; i += 1) {
        timers.push(setTimeout(() => setN(i), Math.round(count * (i / LAST) ** 1.35)));
      }
    }
    timers.push(setTimeout(() => setLeaving(true), count + HOLD_MS));
    timers.push(setTimeout(() => done.current(), count + HOLD_MS + LEAVE_MS));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`loader${leaving ? ' loader--leaving' : ''}`}
      role="progressbar"
      aria-label="Loading Nine Superintelligence"
      aria-valuemin={0}
      aria-valuemax={LAST}
      aria-valuenow={n}
    >
      <div className="loader__mark" aria-hidden="true">
        0{n}
      </div>
      <div className="loader__bar" aria-hidden="true">
        <i style={{ transform: `scaleX(${n / LAST})` }} />
      </div>
    </div>
  );
}
