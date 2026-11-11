import { useEffect, useState } from 'react';
import ScrambleText from './ScrambleText';
import { GlassButton, GlassCard } from './Glass';
import { SoundToggle } from './Nav';
import { prefersReducedMotion, useInView } from '../hooks';
import { useSfx, useSfxProps } from '../sound/SoundProvider';
import { LINKS } from '../config';

function SectionHead({ index, label, title, inView }) {
  return (
    <div className="section-head">
      <p className="section-head__label">
        <span>{index}</span> {label}
      </p>
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
    n: '01',
    name: 'Inference',
    line: 'Squeeze every token.',
    body: 'Make the same model answer faster, on less hardware, without losing quality.',
    tags: ['Speculative decoding', 'Quantization', 'KV-cache compression', 'Batching & scheduling']
  },
  {
    n: '02',
    name: 'Compute',
    line: 'Spend less per thought.',
    body: 'Treat cost-per-useful-answer as the metric that matters, and drive it down.',
    tags: ['Cost-per-token benchmarks', 'Distillation', 'Sparse & MoE routing', 'Consumer & edge GPUs']
  },
  {
    n: '03',
    name: 'Intelligence',
    line: 'More reasoning per parameter.',
    body: 'Get bigger-model behaviour out of smaller models through better data, training and test-time thinking.',
    tags: ['Small-model reasoning', 'Test-time compute', 'Data quality', 'Honest evals']
  },
  {
    n: '04',
    name: 'Beyond LLMs',
    line: 'Find what comes next.',
    body: 'Transformers may not be the end state. We prototype architectures that could do more with far less.',
    tags: ['State-space models', 'Linear & recurrent attention', 'Neuro-symbolic hybrids', 'World models']
  }
];

function TrackCard({ track, delay, inView }) {
  const { play } = useSfx();
  const [hot, setHot] = useState(0);
  return (
    <article
      className="track"
      style={{ transitionDelay: `${delay}ms` }}
      onPointerEnter={() => {
        play('glitch');
        setHot(h => h + 1);
      }}
    >
      <GlassCard>
        <div className="track__top">
          <ScrambleText key={hot} text={track.n} play={inView} className="track__n" duration={420} />
          <span className="track__name">{track.name}</span>
        </div>
        <h3>{track.line}</h3>
        <p>{track.body}</p>
        <ul>
          {track.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </GlassCard>
    </article>
  );
}

export function Research() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  return (
    <section id="research" ref={ref} className={`section research${inView ? ' is-in' : ''}`}>
      <SectionHead index="01" label="Research tracks" title="Four bets on cheaper intelligence." inView={inView} />
      <div className="tracks">
        {TRACKS.map((track, i) => (
          <TrackCard key={track.n} track={track} delay={i * 90} inView={inView} />
        ))}
      </div>
    </section>
  );
}

const QUESTIONS = [
  'how small can a model get before reasoning breaks?',
  'can a 4-bit model match its 16-bit parent on real work?',
  'what does one genuinely useful answer actually cost?',
  'can draft-and-verify decoding run 3x faster on a consumer GPU?',
  'can state-space models replace attention at scale?',
  'what learns more like a brain and less like a lookup table?'
];

const COMMAND = '09 --list open-questions';

export function Notebook() {
  const [ref, inView] = useInView({ threshold: 0.45 });
  const { play } = useSfx();
  const lines = [COMMAND, ...QUESTIONS];
  const [progress, setProgress] = useState({ line: 0, char: 0 });

  useEffect(() => {
    if (!inView) return undefined;
    if (prefersReducedMotion()) {
      setProgress({ line: lines.length, char: 0 });
      return undefined;
    }
    let line = 0;
    let char = 0;
    let timer = 0;
    const step = () => {
      if (line >= lines.length) return;
      if (char < lines[line].length) {
        char += 1;
        if (lines[line][char - 1] !== ' ') play('key');
        timer = setTimeout(step, line === 0 ? 55 : 22 + Math.random() * 26);
      } else {
        play(line === 0 ? 'enter' : 'data');
        line += 1;
        char = 0;
        timer = setTimeout(step, line === 1 ? 420 : 260);
      }
      setProgress({ line, char });
    };
    timer = setTimeout(step, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section id="notebook" ref={ref} className={`section notebook${inView ? ' is-in' : ''}`}>
      <SectionHead index="02" label="Lab notebook" title="Questions on the bench." inView={inView} />
      <div className="terminal" role="log" aria-label="Open research questions">
        <GlassCard className="glass-card--terminal" borderRadius={16} distortionScale={-110}>
        <div className="terminal__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>~/nine-superintelligence</span>
        </div>
        <div className="terminal__body">
          {lines.map((text, i) => {
            if (i > progress.line) return null;
            const shown = i < progress.line ? text : text.slice(0, progress.char);
            const typing = i === progress.line;
            return (
              <p key={text} className={i === 0 ? 'terminal__cmd' : 'terminal__q'}>
                {i === 0 ? <span className="terminal__prompt">$</span> : <span className="terminal__id">q.{String(i).padStart(2, '0')}</span>}
                <span>
                  {shown}
                  {typing && <span className="caret" aria-hidden="true" />}
                </span>
              </p>
            );
          })}
          {progress.line >= lines.length && (
            <p className="terminal__cmd">
              <span className="terminal__prompt">$</span>
              <span>
                <span className="caret" aria-hidden="true" />
              </span>
            </p>
          )}
        </div>
        </GlassCard>
      </div>
      {/* Screen readers get the full list straight away. */}
      <ul className="sr-only">
        {QUESTIONS.map(q => (
          <li key={q}>{q}</li>
        ))}
      </ul>
    </section>
  );
}

const PRINCIPLES = [
  ['Measure in dollars.', 'Benchmarks are half the story. Every result ships with what it costs to run.'],
  ['Small is a feature.', 'A model that fits on a laptop changes who gets to use intelligence.'],
  ['Build in public.', 'Experiments, failures included, get written up and shared.']
];

export function Principles() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const { play } = useSfx();
  return (
    <section id="principles" ref={ref} className={`section principles${inView ? ' is-in' : ''}`}>
      <SectionHead index="03" label="Principles" title="How the lab works." inView={inView} />
      <ol className="principles__list">
        {PRINCIPLES.map(([title, body], i) => (
          <li key={title} style={{ transitionDelay: `${i * 110}ms` }} onPointerEnter={() => play('hover')}>
            <span className="principles__n">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Contact() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const sfx = useSfxProps();
  return (
    <section id="contact" ref={ref} className={`section contact${inView ? ' is-in' : ''}`}>
      <p className="section-head__label">
        <span>04</span> Contact
      </p>
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
  const { enabled, ambient, setAmbient, play } = useSfx();
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="nav__mark">09</span>
        <span>© {new Date().getFullYear()} Nine Superintelligence</span>
      </div>
      <div className="footer__controls">
        <button
          className="chip"
          disabled={!enabled}
          aria-pressed={ambient}
          onClick={() => {
            play(ambient ? 'off' : 'on');
            setAmbient(!ambient);
          }}
          onPointerEnter={() => play('hover')}
        >
          Ambient pad: {ambient ? 'on' : 'off'}
        </button>
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
