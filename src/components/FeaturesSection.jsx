import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const features = [
  {
    icon: '👥',
    title: 'Small Batch Sizes',
    desc: 'Personalized attention with limited students per batch, ensuring every child gets the focus they deserve.',
  },
  {
    icon: '💡',
    title: 'Concept-Based Learning',
    desc: 'We teach the "why" behind every concept, building deep understanding that lasts beyond exams.',
  },
  {
    icon: '📋',
    title: 'All Boards Covered',
    desc: 'Comprehensive support for CBSE, State Board, and other boards with tailored teaching approaches.',
  },
  {
    icon: '📈',
    title: 'Regular Tests & Tracking',
    desc: 'Periodic assessments with detailed performance reports so parents and students always know where they stand.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="features-section section" id="features">
      <motion.div
        className="section-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>Why Learnix</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          The <span className="gradient-text">Learnix</span> Advantage
        </motion.h2>
        <motion.p className="section-subtitle" style={{ margin: '0 auto' }} variants={fadeUp}>
          What sets us apart — our commitment to quality education, individual growth,
          and a teaching philosophy that puts students first.
        </motion.p>

        <motion.div className="features-grid" variants={stagger}>
          {features.map((feature) => (
            <motion.div className="glass-card feature-card" key={feature.title} variants={fadeUp}>
              <div className="feature-icon-wrap">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
