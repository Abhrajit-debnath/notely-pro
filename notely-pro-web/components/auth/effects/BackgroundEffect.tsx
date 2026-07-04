import Strands from './renderer/BgRenderer';


export default function BackgroundEffect() {
  return <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
    <Strands
      colors={["#F97316", "#7C3AED", "#06B6D4"]}
      count={10}
      speed={0.3}
      amplitude={0.5}
      waviness={0.2}
      thickness={0.7}
      glow={2.6}
      taper={3}
      spread={1}
      intensity={0.6}
      saturation={2}
      opacity={1}
      scale={1.5}
      glass={false}
      refraction={1}
      dispersion={1}
      glassSize={1}
      hueShift={0}
    />
  </div>
}