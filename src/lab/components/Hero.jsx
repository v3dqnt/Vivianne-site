import GradientASCII from './GradientASCII';
import ScrambleText from './ScrambleText';
import { GlassButton } from './Glass';
import { useSfx, useSfxProps } from '../sound/SoundProvider';

export default function Hero({ live }) {
  const { play } = useSfx();
  const sfx = useSfxProps();

  // Clicking the field sends a scramble wave through the glyphs; give it a zap.
  const onFieldDown = event => {
    if (event.target.closest('a, button')) return;
    play('zap');
  };

  return (
    <section id="top" className="hero" onPointerDown={onFieldDown}>
      <div className="hero__field">
        {live && (
          <GradientASCII
            colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
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
            Join the experiment
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
