import GlassSurface from './GlassSurface';

// Shared glass presets so every surface on the site bends light the same way.

export function GlassButton({ size = 'md', className = '', children, ...linkProps }) {
  const height = size === 'lg' ? 52 : 44;
  return (
    <GlassSurface
      width="auto"
      height={height}
      borderRadius={height / 2}
      borderWidth={0.12}
      distortionScale={-90}
      blur={6}
      backgroundOpacity={0.18}
      saturation={1.3}
      className={`glass-btn glass-btn--${size} ${className}`}
    >
      <a className="glass-btn__link" {...linkProps}>
        {children}
      </a>
    </GlassSurface>
  );
}
