import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function HeroSection() {
  return (
    <section className="hero-section section" id="hero">
      {/* Soft decorative blobs */}
      <div style={{
        position: 'absolute', width: 600, height: 600, top: '-15%', right: '-15%',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', width: 500, height: 500, bottom: '-10%', left: '-10%',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div className="hero-badge" variants={fadeUp} custom={0}>
          <span className="dot" />
          Now Enrolling for 2026–27
        </motion.div>

        <motion.h1 className="hero-title" variants={fadeUp} custom={1}>
          <span className="gradient-text">Learnix</span>
          <br />
          Coaching Classes
        </motion.h1>

        <motion.p className="hero-subtitle" variants={fadeUp} custom={2}>
          Building strong foundations from Std 1 to 10 with concept-first teaching,
          personalized attention, and proven results across all boards.
        </motion.p>

        <motion.div className="hero-teacher" variants={fadeUp} custom={3}>
          <span className="teacher-line" />
          Teacher: <strong>Meena Meshram</strong>
          <span className="teacher-line" />
        </motion.div>

        <motion.div className="hero-actions" variants={fadeUp} custom={4}>
          <a href="#courses" className="glow-btn">
            Explore Programs ↓
          </a>
          <a href="#contact" className="glow-btn-outline">
            Get in Touch
          </a>
        </motion.div>

        <motion.div className="hero-stats" variants={fadeUp} custom={5}>
          <div className="hero-stat">
            <div className="hero-stat-value gradient-text">10+</div>
            <div className="hero-stat-label">Years Experience</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value gradient-text">500+</div>
            <div className="hero-stat-label">Students Taught</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value gradient-text">95%</div>
            <div className="hero-stat-label">Success Rate</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value gradient-text">All</div>
            <div className="hero-stat-label">Boards Covered</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
