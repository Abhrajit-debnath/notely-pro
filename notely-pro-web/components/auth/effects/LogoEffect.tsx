"use client"

import ShinyText from './renderer/LogoTextRenderer';


export default function LogoTextEffect() {
  return <ShinyText
  className="text-lg"
    text="Notely Pro"
    speed={3}
    delay={0}
    color="#b5b5b5"
    shineColor="#ffffff"
    spread={120}
    direction="left"
    yoyo={false}
    pauseOnHover={false}
    disabled={false}
  />
}
