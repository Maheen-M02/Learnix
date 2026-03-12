import { useEffect, useCallback } from 'react'
import { useStore } from './store'
import Canvas3D from './components/Canvas3D'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import CoursesSection from './components/CoursesSection'
import FeaturesSection from './components/FeaturesSection'
import TeacherSection from './components/TeacherSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  const setScrollProgress = useStore((s) => s.setScrollProgress)
  const setMousePosition = useStore((s) => s.setMousePosition)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? scrollTop / docHeight : 0
    setScrollProgress(Math.min(Math.max(progress, 0), 1))
  }, [setScrollProgress])

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    })
  }, [setMousePosition])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleScroll, handleMouseMove])

  return (
    <>
      {/* 3D Background */}
      <Canvas3D />

      {/* Grid overlay for depth */}
      <div className="grid-bg" />

      {/* HTML Content */}
      <div className="content-overlay">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <FeaturesSection />
        <TeacherSection />
        <TestimonialsSection />
        <ContactSection />

        <footer className="footer">
          <div style={{ marginBottom: 8 }}>© 2026 <span>Learnix Coaching Classes</span>. All rights reserved.</div>
          <div style={{ fontSize: '0.8rem' }}>Crafted with 💙 for brighter futures</div>
        </footer>
      </div>
    </>
  )
}
