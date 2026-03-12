import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const highlights = [
  { icon: '📖', text: 'Concept-based Learning' },
  { icon: '🎯', text: 'Exam Focused Prep' },
  { icon: '👥', text: 'Small Batch Sizes' },
  { icon: '📊', text: 'Regular Assessments' },
]

export default function AboutSection() {
  return (
    <section className="about-section section" id="about">
      <div className="section-inner">
        <motion.div
          className="about-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          {/* Left: Text */}
          <div className="about-text">
            <motion.span className="section-label" variants={fadeUp}>About Us</motion.span>
            <motion.h2 className="section-title" variants={fadeUp}>
              Where <span className="gradient-text">Learning</span> Meets Excellence
            </motion.h2>
            <motion.p variants={fadeUp}>
              At Learnix, we believe every student has the potential to excel. Founded and led by
              <strong> Meena Meshram</strong>, our coaching classes provide a nurturing environment where
              students from Std 1 to Std 10 develop deep conceptual understanding — not just rote learning.
            </motion.p>
            <motion.p variants={fadeUp}>
              We support students across <strong>CBSE, State Board, and other boards</strong>,
              ensuring curriculum-aligned teaching with a focus on strong fundamentals,
              concept clarity, and comprehensive exam preparation.
            </motion.p>

            <motion.div className="about-highlights" variants={stagger}>
              {highlights.map((item) => (
                <motion.div className="highlight-item" key={item.text} variants={fadeUp}>
                  <span className="highlight-icon">{item.icon}</span>
                  <span className="highlight-text">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats Cards */}
          <motion.div className="about-visual" variants={stagger}>
            <div className="about-card-stack">
              <motion.div className="glass-card about-stat-card" variants={fadeUp}>
                <div className="stat-number gradient-text">Std 1–10</div>
                <div className="stat-text">All grades covered under one roof</div>
              </motion.div>
              <motion.div className="glass-card about-stat-card" variants={fadeUp}>
                <div className="stat-number gradient-text">3 Boards</div>
                <div className="stat-text">CBSE · State Board · Other Boards</div>
              </motion.div>
              <motion.div className="glass-card about-stat-card" variants={fadeUp}>
                <div className="stat-number gradient-text">100%</div>
                <div className="stat-text">Dedication to every student's growth</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
