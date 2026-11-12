import { useEffect } from 'react';
import ScrambleText from './ScrambleText';
import { GlassButton } from './Glass';
import { SoundToggle } from './Nav';
import { useInView } from '../hooks';
import { useSfx, useSfxProps } from '../sound/SoundProvider';
import { LINKS } from '../config';

function SectionHead({ label, title, inView }) {
  return (
    <div className="section-head">
      {label && <p className="section-head__label">{label}</p>}
      <ScrambleText as="h2" text={title} play={inView} cue="data" duration={800} />
    </div>
  );
}

export function Manifesto() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const { play } = useSfx();
  useEffect(() => {
    if (inView) play('swell');
  }, [inView, play]);

  return (
    <section ref={ref} className={`manifesto${inView ? ' is-in' : ''}`} aria-label="Why Nine Superintelligence exists">
      <p className="manifesto__text">
        <span>Frontier models are brilliant</span> <span className="muted">and absurdly expensive to run.</span>{' '}
        <span className="muted">Every token burns GPU hours, energy and money.</span>{' '}
        <span>
          We think intelligence should get <em>cheaper</em> as fast as it gets <em>smarter</em>.
        </span>
      </p>
    </section>
  );
}

const TRACKS = [
  {
    name: 'Inference',
    line: 'Squeeze every token.',
    body: 'Make the same model answer faster, on less hardware, without losing quality.',
    tags: ['Speculative decoding', 'Quantization', 'KV-cache compression', 'Batching & scheduling']
  },
  {
    name: 'Compute',
    line: 'Spend less per thought.',
    body: 'Treat cost-per-useful-answer as the metric that matters, and drive it down.',
    tags: ['Cost-per-token benchmarks', 'Distillation', 'Sparse & MoE routing', 'Consumer & edge GPUs']
  },
  {
    name: 'Intelligence',
    line: 'More reasoning per parameter.',
    body: 'Get bigger-model behaviour out of smaller models through better data, training and test-time thinking.',
    tags: ['Small-model reasoning', 'Test-time compute', 'Data quality', 'Honest evals']
  },
  {
    name: 'Beyond LLMs',
    line: 'Find what comes next.',
    body: 'Transformers may not be the end state. We prototype architectures that could do more with far less.',
    tags: ['State-space models', 'Linear & recurrent attention', 'Neuro-symbolic hybrids', 'World models']
  }
];

// One column per track: what it is, the claim, why, what we try. A track
// with an `image` (a file in /public/lab) shows it at the foot of its column.
function Track({ track, delay }) {
  const { play } = useSfx();
  return (
    <article className="track" style={{ transitionDelay: `${delay}ms` }} onPointerEnter={() => play('glitch')}>
      <p className="track__name">{track.name}</p>
      <h3>{track.line}</h3>
      <p className="track__body">{track.body}</p>
      <p className="track__tags">{track.tags.join(', ')}</p>
      {track.image && <img className="track__art" src={track.image} alt="" width="1024" height="1024" loading="lazy" />}
    </article>
  );
}

export function Research() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section id="research" ref={ref} className={`section research${inView ? ' is-in' : ''}`}>
      <SectionHead title="Four bets on cheaper intelligence." inView={inView} />
      <div className="tracks">
        {TRACKS.map((track, i) => (
          <Track key={track.name} track={track} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}

export function Product() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const sfx = useSfxProps();
  return (
    <section id="vivianne" ref={ref} className={`section product${inView ? ' is-in' : ''}`}>
      <SectionHead label="Our first product" title="Meet Vivianne." inView={inView} />
      <div className="product__grid">
        <div className="product__copy">
          <p className="product__lede">
            Vivianne is a desktop AI agent for code, math and science. It runs its own agent with any model or a local one,
            runs coding agents like Claude Code over the Agent Client Protocol, and keeps always-on assistants working while
            you are away.
          </p>
          <ul className="product__points">
            <li>Any model: your own keys, or one running on your machine</li>
            <li>Claude Code and other coding agents, inside one app</li>
            <li>24/7 assistants, plus computer control</li>
          </ul>
          <div className="product__actions">
            <a className="btn btn--primary btn--lg" href="/vivianne" {...sfx('click')}>
              Explore Vivianne
            </a>
            <GlassButton size="lg" href="/vivianne/downloads" {...sfx('link')}>
              Download
            </GlassButton>
          </div>
        </div>
        <a className="product__shot" href="/vivianne" aria-label="Explore Vivianne" {...sfx('click')}>
          <img src="/hero-interface.png" width="1617" height="1005" loading="lazy" alt="Vivianne working through a task" />
        </a>
      </div>
    </section>
  );
}

export function Contact() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const sfx = useSfxProps();
  return (
    <section id="contact" ref={ref} className={`section contact${inView ? ' is-in' : ''}`}>
      <ScrambleText as="h2" className="contact__title" text="Come break things with us." play={inView} cue="decode" duration={1000} />
      <p className="contact__lede">
        Researchers, engineers and the curious: if you care about making AI cheaper and smarter, say hello.
      </p>
      <div className="contact__actions">
        <a className="btn btn--primary btn--lg" href={LINKS.email} {...sfx('send')}>
          Get in touch
        </a>
        <GlassButton size="lg" href={LINKS.github} target="_blank" rel="noreferrer" {...sfx('link')}>
          GitHub
        </GlassButton>
        <GlassButton size="lg" href={LINKS.x} target="_blank" rel="noreferrer" {...sfx('link')}>
          X / Twitter
        </GlassButton>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="nav__mark">09</span>
        <span>© {new Date().getFullYear()} Nine Superintelligence</span>
      </div>
      <div className="footer__controls">
        <SoundToggle compact />
      </div>
      <p className="footer__credit">
        Sounds generated live in your browser with{' '}
        <a href="https://reactbits.dev/tools/sound-lab" target="_blank" rel="noreferrer">
          React Bits Sound Lab
        </a>
        .
      </p>
    </footer>
  );
}
