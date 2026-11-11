import { useEffect, useState } from 'react';
import { useSfx, useSfxProps } from '../sound/SoundProvider';
import GlassSurface from './GlassSurface';

const ITEMS = [
  ['Research', '#research'],
  ['Vivianne', '#vivianne'],
  ['Contact', '#contact']
];

export function SoundToggle({ compact = false }) {
  const { enabled, toggle, play } = useSfx();
  const button = (
    <button
      className={`sound-toggle${enabled ? ' is-on' : ''}`}
      onClick={toggle}
      onPointerEnter={() => play('hover')}
      aria-pressed={enabled}
      aria-label={enabled ? 'Mute sound' : 'Turn sound on'}
    >
      <span className="eq" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      {!compact && <span className="sound-toggle__label">{enabled ? 'Sound on' : 'Sound off'}</span>}
    </button>
  );
  if (compact) return button;
  return (
    <GlassSurface
      width="auto"
      height={38}
      borderRadius={19}
      borderWidth={0.14}
      distortionScale={-80}
      blur={5}
      backgroundOpacity={0.2}
      saturation={1.3}
      className="glass-toggle"
    >
      {button}
    </GlassSurface>
  );
}

export default function Nav() {
  const sfx = useSfxProps();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#top" className="nav__brand" {...sfx('nav')}>
        <span className="nav__mark">09</span>
        <span className="nav__name">Nine Superintelligence</span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        {ITEMS.map(([label, href], i) => (
          <a key={href} href={href} {...sfx('nav')}>
            <span className="nav__index">0{i + 1}</span>
            {label}
          </a>
        ))}
      </nav>
      <SoundToggle />
    </header>
  );
}
