/**
 * AnimatedBackground
 * ------------------
 * Modern, subtle multi-layer civic-tech background system.
 *
 * Layer 1: Ambient Gradient Orbs (slowly drifting, highly blurred)
 * Layer 2: Soft Particles (gentle floating ambient dots)
 * Layer 3: Ultra-subtle Mesh Grid (clean technological geometry)
 *
 * Guaranteed Safety:
 * - position: fixed, z-index: 0
 * - pointer-events: none (cannot block or receive any clicks)
 * - overflow: hidden (zero page scroll impact)
 * - 100% pure CSS transforms and opacity (hardware accelerated)
 * - Theme-aware via CSS variables
 */

// 12 subtle ambient particles with balanced distribution
const PARTICLES = [
  { x: 12, y: 18, size: 3.5, dur: 24, delay: 0 },
  { x: 28, y: 75, size: 2.5, dur: 30, delay: 3 },
  { x: 48, y: 32, size: 3.0, dur: 22, delay: 1.5 },
  { x: 68, y: 82, size: 2.0, dur: 28, delay: 4 },
  { x: 84, y: 22, size: 3.5, dur: 26, delay: 2 },
  { x: 92, y: 68, size: 2.5, dur: 32, delay: 5 },
  { x: 20, y: 45, size: 2.0, dur: 25, delay: 6 },
  { x: 62, y: 15, size: 3.0, dur: 29, delay: 3.5 },
  { x: 38, y: 90, size: 2.5, dur: 27, delay: 7 },
  { x: 76, y: 48, size: 3.0, dur: 23, delay: 1 },
  { x: 8,  y: 85, size: 2.0, dur: 31, delay: 4.5 },
  { x: 52, y: 62, size: 2.5, dur: 25, delay: 8 },
]

export default function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Layer 1: Ambient Gradient Orbs */}
      <div className="animated-bg__orb animated-bg__orb--blue" />
      <div className="animated-bg__orb animated-bg__orb--green" />
      <div className="animated-bg__orb animated-bg__orb--indigo" />

      {/* Layer 2: Soft Particles */}
      <div className="animated-bg__particles-wrap">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animated-bg__particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Ultra-subtle Mesh Grid */}
      <div className="animated-bg__grid" />
    </div>
  )
}
