import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks';
import { useSfx } from '../sound/SoundProvider';

// Same ramp as the hero's GradientASCII so headings "decode" out of the background.
const GLYPHS = '=+xX0S8#@';

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export default function ScrambleText({
  text,
  as: Tag = 'span',
  play = true,
  duration = 900,
  delay = 0,
  cue,
  className = '',
  ...rest
}) {
  const [output, setOutput] = useState(() => text.replace(/\S/g, ' '));
  const sfx = useSfx();

  useEffect(() => {
    if (!play) return undefined;
    if (prefersReducedMotion()) {
      setOutput(text);
      return undefined;
    }
    const chars = [...text];
    // Each character settles at its own moment, left to right with jitter.
    const settleAt = chars.map((_, i) => (i / Math.max(1, chars.length)) * duration * 0.7 + Math.random() * duration * 0.3);
    let raf = 0;
    let begin = 0;
    const timer = setTimeout(() => {
      if (cue) sfx?.play(cue);
      const tick = now => {
        if (!begin) begin = now;
        const t = now - begin;
        let done = true;
        setOutput(
          chars
            .map((char, i) => {
              if (char === ' ' || t >= settleAt[i]) return char;
              done = false;
              return t > settleAt[i] - duration * 0.45 ? randomGlyph() : ' ';
            })
            .join('')
        );
        if (!done) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  return (
    <Tag className={`scramble ${className}`} aria-label={text} {...rest}>
      <span aria-hidden="true">{output}</span>
    </Tag>
  );
}
