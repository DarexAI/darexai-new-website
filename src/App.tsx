import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './pages/Hero/Hero'
import Signal from './pages/Signal/Signal'
import RabbitHole from './pages/RabbitHole/RabbitHole'
import TransitionSpacer from './pages/TransitionSpacer/TransitionSpacer'
import Industries from './pages/Industries/Industries'
import HowItWorks from './pages/HowItWorks/HowItWorks'
import Contact from './pages/Contact/Contact'

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isTouchDevice,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <main id="main-content">
      <Hero />
      <Signal />
      <RabbitHole />
      <TransitionSpacer text="INDUSTRIES WE IMPACT" variant="belt" />
      <Industries />
      <TransitionSpacer text="WORKFLOWS ✕ AUTOMATION ✕ INTELLIGENCE" variant="belt" />
      <HowItWorks />
      <TransitionSpacer variant="punchline" />
      <Contact />
    </main>
  )
}

export default App
