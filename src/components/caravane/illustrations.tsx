// Hand-drawn SVG illustrations for the Caravane de l'Espoir site.
// People are drawn modestly dressed: long sleeves and long garments,
// and girls/women always wear a hijab.

const INK = '#2b1d14'

/** The caravan van, facing right. Drawn in a 140×80 box, wheels resting on y=76. */
export function VanShape({ body = '#2c5f9e', label = "CARAVANE DE L'ESPOIR" }: { body?: string; label?: string }) {
  const arabic = /[\u0600-\u06FF]/.test(label)
  return (
    <g>
      {/* Load on the roof rack: cartables, books and bundled clothes */}
      <rect x="18" y="-6" width="24" height="18" rx="4" fill="#c0532d" />
      <rect x="24" y="-2" width="12" height="4" rx="1" fill="#d39b2a" />
      <rect x="44" y="0" width="22" height="12" rx="2" fill="#d39b2a" />
      <path d="M44 6h22" stroke="#9c3f1f" strokeWidth="1.5" />
      <rect x="68" y="-8" width="20" height="20" rx="5" fill="#3e8a4a" />
      <path d="M68 2h20M78 -8v20" stroke="#2f6b39" strokeWidth="1.5" />
      <rect x="14" y="12" width="80" height="4" rx="1" fill={INK} />
      {/* Body */}
      <path
        d="M12 16h86c8 0 13 4 18 12l14 18c4 1 6 4 6 9v9c0 3-2 5-5 5H11c-3 0-5-2-5-5V22c0-3 3-6 6-6z"
        fill={body}
      />
      <path d="M100 22h7c3 0 5 1 7 4l11 16h-25z" fill="#d6e7f3" />
      <rect x="16" y="22" width="22" height="18" rx="2" fill="#d6e7f3" />
      <rect x="44" y="22" width="22" height="18" rx="2" fill="#d6e7f3" />
      <rect x="72" y="22" width="22" height="18" rx="2" fill="#d6e7f3" />
      <rect x="6" y="46" width="130" height="5" fill="#d39b2a" />
      <text
        x="58"
        y="63"
        textAnchor="middle"
        fontSize={arabic ? 10 : 7.5}
        fontWeight="700"
        letterSpacing={arabic ? 0 : 0.6}
        fill="#fbf5ea"
        fontFamily={arabic ? 'var(--font-ar-body), sans-serif' : 'system-ui, sans-serif'}
      >
        {label}
      </text>
      <rect x="130" y="54" width="6" height="5" rx="1" fill="#f6d27a" />
      {/* Wheels */}
      <circle cx="34" cy="70" r="10" fill={INK} />
      <circle cx="34" cy="70" r="4" fill="#a39486" />
      <circle cx="112" cy="70" r="10" fill={INK} />
      <circle cx="112" cy="70" r="4" fill="#a39486" />
    </g>
  )
}

/** Compact van glyph for small UI places (progress trail, buttons). */
export function VanGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 -10 142 92" className={className} aria-hidden="true">
      <VanShape />
    </svg>
  )
}

type PersonProps = {
  x: number
  y: number
  scale?: number
  hijab?: string
  garment: string
  skin?: string
  bag?: string
  book?: string
  beanie?: string
}

/**
 * A stylized figure standing with feet at (x, y).
 * With `hijab` set: a girl or woman in a long dress and headscarf.
 * Without: a boy in a long-sleeved shirt and long trousers.
 */
export function Person({ x, y, scale = 1, hijab, garment, skin = '#c68b5f', bag, book, beanie }: PersonProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {bag && <rect x="6" y="-50" width="16" height="22" rx="4" fill={bag} />}
      {hijab ? (
        <>
          <path d="M-14-50h28l3 50h-34z" fill={garment} />
          <ellipse cx="-6" cy="0" rx="5" ry="2.5" fill={INK} />
          <ellipse cx="6" cy="0" rx="5" ry="2.5" fill={INK} />
        </>
      ) : (
        <>
          <rect x="-11" y="-26" width="9" height="26" rx="2" fill="#3b4a5c" />
          <rect x="2" y="-26" width="9" height="26" rx="2" fill="#3b4a5c" />
          <ellipse cx="-7" cy="0" rx="5" ry="2.5" fill={INK} />
          <ellipse cx="7" cy="0" rx="5" ry="2.5" fill={INK} />
          <path d="M-13-50h26l1 26h-28z" fill={garment} />
        </>
      )}
      {/* Long sleeves down to the wrists */}
      <rect x="-20" y="-49" width="7" height="27" rx="3" fill={garment} />
      <rect x="13" y="-49" width="7" height="27" rx="3" fill={garment} />
      {book ? (
        <>
          <rect x="-12" y="-36" width="24" height="15" rx="1.5" fill={book} />
          <path d="M0-36v15" stroke="#fbf5ea" strokeWidth="1.2" />
          <circle cx="-13" cy="-28" r="3" fill={skin} />
          <circle cx="13" cy="-28" r="3" fill={skin} />
        </>
      ) : (
        <>
          <circle cx="-16.5" cy="-20" r="3" fill={skin} />
          <circle cx="16.5" cy="-20" r="3" fill={skin} />
        </>
      )}
      {bag && <path d="M-9-50l3 18M9-50l-3 18" stroke={bag} strokeWidth="3" strokeLinecap="round" />}
      {hijab ? (
        <>
          <circle cx="0" cy="-62" r="13" fill={hijab} />
          <path d="M-13-62c-4 10-3 17 0 20h26c3-3 4-10 0-20z" fill={hijab} />
          <ellipse cx="0" cy="-61" rx="8" ry="9" fill={skin} />
        </>
      ) : (
        <>
          <circle cx="0" cy="-61" r="9.5" fill={skin} />
          {beanie ? (
            <>
              <path d="M-10-62a10 10 0 0 1 20 0z" fill={beanie} />
              <circle cx="0" cy="-73" r="3" fill={beanie} />
            </>
          ) : (
            <path d="M-9.5-62c1-9 18-9 19 0-3-4-8-5-9.5-5s-6.5 1-9.5 5z" fill={INK} />
          )}
        </>
      )}
      <circle cx="-3" cy="-61" r="1.1" fill={INK} />
      <circle cx="3" cy="-61" r="1.1" fill={INK} />
      <path d="M-3-56.5q3 2.2 6 0" stroke={INK} strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </g>
  )
}

const ROAD = 'M-200 70 C 160 52, 420 88, 740 64 S 1180 50, 1660 66'

/**
 * The bottom edge of the hero: a sand-coloured ridge with a road on which the caravan drives.
 * It sits over the hero photo and flows into the next section.
 */
export function RoadStrip({ animate = true, vanLabel }: { animate?: boolean; vanLabel?: string }) {
  return (
    <svg
      viewBox="0 0 1440 130"
      preserveAspectRatio="xMidYMax slice"
      className="block h-[110px] w-full md:h-[130px]"
      aria-hidden="true"
    >
      <path d="M0 40 L180 18 L360 34 L560 10 L760 30 L960 8 L1160 28 L1320 14 L1440 26 V130 H0Z" fill="#fbf5ea" opacity="0.35" />
      <path d="M0 58 Q360 34 720 50 T1440 44 V130 H0Z" fill="#fbf5ea" />
      <path d={ROAD} stroke="#ebd5ae" strokeWidth="30" fill="none" />
      <path d={ROAD} stroke="#fbf5ea" strokeWidth="2.5" strokeDasharray="16 18" fill="none" />
      {[0, 1].map((i) => (
        <g key={i}>
          <g transform="scale(0.62) translate(-70 -72)">
            <VanShape body={i === 0 ? '#2c5f9e' : '#c0532d'} label={vanLabel} />
          </g>
          {animate ? (
            <animateMotion dur="24s" repeatCount="indefinite" begin={`${-i * 2.6}s`} path={ROAD} rotate="auto" />
          ) : (
            <animateMotion
              dur="0.01s"
              fill="freeze"
              keyPoints={`${0.42 - i * 0.1};${0.42 - i * 0.1}`}
              keyTimes="0;1"
              calcMode="linear"
              path={ROAD}
              rotate="auto"
            />
          )}
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Supply icons (64×64)                                                */
/* ------------------------------------------------------------------ */

export function IconCartable() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M24 16c0-6 16-6 16 0" stroke="#9c3f1f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="12" y="16" width="40" height="40" rx="8" fill="#c0532d" />
      <path d="M12 26c0-5 4-10 10-10h20c6 0 10 5 10 10v6H12z" fill="#9c3f1f" />
      <rect x="28" y="28" width="8" height="10" rx="2" fill="#d39b2a" />
      <rect x="18" y="42" width="28" height="8" rx="3" fill="#d96f45" />
    </svg>
  )
}

export function IconOutils() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g transform="rotate(-35 32 32)">
        <rect x="8" y="34" width="48" height="11" rx="2" fill="#2c5f9e" />
        {[14, 20, 26, 32, 38, 44, 50].map((x, i) => (
          <path key={x} d={`M${x} 34v${i % 2 ? 4 : 6}`} stroke="#fbf5ea" strokeWidth="1.6" />
        ))}
      </g>
      <g transform="rotate(40 32 32)">
        <rect x="14" y="20" width="34" height="9" fill="#d39b2a" />
        <rect x="10" y="20" width="5" height="9" rx="1" fill="#c0532d" />
        <path d="M48 20l9 4.5-9 4.5z" fill="#f2d3a1" />
        <path d="M54 23l3 1.5-3 1.5z" fill="#2b1d14" />
      </g>
    </svg>
  )
}

export function IconVetements() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 22l-12 8 4 26h36l4-26-12-8-5 4h-10z" fill="#2c5f9e" />
      <path d="M32 26v30" stroke="#1b3a63" strokeWidth="2" />
      <circle cx="35" cy="34" r="1.6" fill="#fbf5ea" />
      <circle cx="35" cy="42" r="1.6" fill="#fbf5ea" />
      <path d="M22 22c3 6 17 6 20 0" stroke="#c0532d" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M40 24l4 14" stroke="#c0532d" strokeWidth="6" strokeLinecap="round" />
      <path d="M20 14a12 10 0 0 1 24 0z" fill="#d39b2a" transform="translate(0 -2)" />
      <circle cx="32" cy="2.5" r="3.5" fill="#d39b2a" transform="translate(0 2)" />
    </svg>
  )
}

export function IconLivres() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="10" y="44" width="44" height="10" rx="2" fill="#3e8a4a" />
      <rect x="14" y="34" width="38" height="10" rx="2" fill="#c0532d" />
      <rect x="12" y="24" width="40" height="10" rx="2" fill="#2c5f9e" />
      <path d="M16 47h20M18 37h18M16 27h20" stroke="#fbf5ea" strokeWidth="1.6" opacity="0.8" />
      <path d="M18 22c6-6 12-6 14-2 2-4 8-4 14 2v-12c-6-5-12-5-14-1-2-4-8-4-14 1z" fill="#d39b2a" />
      <path d="M32 9v13" stroke="#9c6c14" strokeWidth="1.5" />
    </svg>
  )
}

export function IconEtageres() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="8" width="48" height="50" rx="2" fill="#8f5634" />
      <rect x="12" y="12" width="40" height="18" fill="#f3e6cf" />
      <rect x="12" y="35" width="40" height="18" fill="#f3e6cf" />
      {[
        [14, 14, '#c0532d'],
        [19, 16, '#2c5f9e'],
        [24, 13, '#d39b2a'],
        [29, 15, '#3e8a4a'],
      ].map(([x, top, c]) => (
        <rect key={`a${x}`} x={x as number} y={top as number} width="4.5" height={30 - (top as number)} fill={c as string} />
      ))}
      <rect x="36" y="18" width="4.5" height="12" fill="#c0532d" transform="rotate(-18 38 30)" />
      {[
        [14, 38, '#3e8a4a'],
        [19, 37, '#c0532d'],
        [24, 39, '#2c5f9e'],
        [38, 37, '#d39b2a'],
        [43, 38, '#2c5f9e'],
      ].map(([x, top, c]) => (
        <rect key={`b${x}`} x={x as number} y={top as number} width="4.5" height={53 - (top as number)} fill={c as string} />
      ))}
    </svg>
  )
}

export function IconJeux() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="10" width="48" height="44" rx="4" fill="none" stroke="#8f5634" strokeWidth="4" />
      {[20, 32, 44].map((y, row) => (
        <g key={y}>
          <path d={`M10 ${y}h44`} stroke="#8f5634" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((b) => (
            <circle
              key={b}
              cx={(row === 1 ? 26 : 16) + b * 7 + (b > 1 && row !== 1 ? 14 : 0)}
              cy={y}
              r="3.6"
              fill={['#c0532d', '#2c5f9e', '#d39b2a'][row]}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
