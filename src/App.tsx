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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Hero />
      <Signal />
      <RabbitHole />
      <TransitionSpacer text="INDUSTRIES WE IMPACT" variant="belt" />
      <Industries />
      <TransitionSpacer text="WORKFLOWS ✕ AUTOMATION ✕ INTELLIGENCE" variant="belt" />
      <HowItWorks />
      <TransitionSpacer variant="punchline" />
      <Contact />
    </>
  )
}

export default App