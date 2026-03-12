import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Features', href: '#features' },
  { label: 'Mentor', href: '#teacher' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      {/* Overlay behind mobile menu */}
      {mobileOpen && (
        <div
          className="mobile-menu-overlay active"
          onClick={closeMobile}
        />
      )}

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="navbar-brand">
          <span className="logo-icon">L</span>
          <span className="gradient-text">Learnix</span>
        </a>

        <ul className={`navbar-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={closeMobile}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="glow-btn navbar-cta" onClick={closeMobile}>
              Enroll Now
            </a>
          </li>
        </ul>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>
    </>
  )
}
