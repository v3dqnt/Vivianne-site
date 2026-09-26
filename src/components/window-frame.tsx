import Image from "next/image";

/** Every product screenshot sits in the same thin frame (hairline border,
 * radius, soft shadow), so shots taken at different sizes still read as one
 * app rather than loose images. The shots carry the app's own title bar, so
 * the frame adds no chrome of its own. */
export function WindowFrame({
  src,
  alt,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="window-frame">
      <Image src={src} alt={alt} width={width} height={height} priority={priority} className="block w-full h-auto" />
    </div>
  );
}
