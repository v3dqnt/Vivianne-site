import { useEffect, useRef } from 'react';
import GradientASCII from './GradientASCII';
import ScrambleText from './ScrambleText';
import { GlassButton } from './Glass';
import { useSfx, useSfxProps } from '../sound/SoundProvider';
import { prefersReducedMotion } from '../hooks';

export default function Hero({ live }) {
  const { play } = useSfx();
  const sfx = useSfxProps();
  const ref = useRef(null);

  // How far the hero has scrolled away, 0 to 1, as --p: the dark at its foot
  // rises with it and the words fade, so it hands over to the next section.
  useEffect(() => {
    const hero = ref.current;
    if (!hero || prefersReducedMotion()) return undefined;
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.8)));
      if (Math.abs(p - last) < 0.002) return;
      last = p;
      hero.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Clicking the field sends a scramble wave through the glyphs; give it a zap.
  const onFieldDown = event => {
    if (event.target.closest('a, button')) return;
    play('zap');
  };

  return (
    <section id="top" ref={ref} className="hero" onPointerDown={onFieldDown}>
      <div className="hero__field">
        {live && (
          <GradientASCII
            colors={['#3f3f46', '#fafafa', '#d4d4d8', '#71717a']}
            shape="horizon"
            characters=" =+xX0S8#@"
            cellSize={16}
            density={0.82}
            glow={0.35}
            flicker={0.25}
            scrambleRadius={0.08}
            clickEffect="wave"
          />
        )}
        <div className="hero__vignette" aria-hidden="true" />
        <div className="hero__rise" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">
          <ScrambleText text="Smarter models." play={live} delay={900} duration={1100} cue="decode" />
          <br />
          <ScrambleText text="Smaller bills." play={live} delay={1500} duration={1100} className="accent" />
        </h1>
        <p className="hero__lede">
          An experiment at the cutting edge of AI: faster inference, cheaper compute, more intelligence per
          parameter, and a search for what replaces the LLM.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#research" {...sfx('click')}>
            Explore the research
          </a>
          <GlassButton href="#contact" {...sfx('click')}>
            Get in touch
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
