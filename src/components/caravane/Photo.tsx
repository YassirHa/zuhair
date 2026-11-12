import Image from 'next/image'

/** A captioned project photo. The source photos are small, so they are never shown wider than ~480px. */
export default function Photo({ src, alt, caption, width, height, light = false }: { src: string; alt: string; caption: string; width: number; height: number; light?: boolean }) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 480px, 100vw"
        className="h-auto w-full rounded-3xl object-cover shadow-md"
      />
      <figcaption className={`mt-3 text-sm ${light ? 'text-[#fbf5ea]/70' : 'text-[#5c4636]'}`}>{caption}</figcaption>
    </figure>
  )
}
