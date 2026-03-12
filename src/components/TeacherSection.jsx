import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const qualities = [
  '10+ Years of Experience',
  'Concept-First Approach',
  'Individual Student Focus',
  'Board Exam Expert',
  'Patience & Dedication',
  'Proven Track Record',
]

export default function TeacherSection() {
  return (
    <section className="teacher-section section" id="teacher">
      <motion.div
        className="section-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        style={{ textAlign: 'center' }}
      >
        <motion.span className="section-label" variants={fadeUp}>Meet Our Mentor</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          The Heart of <span className="gradient-text">Learnix</span>
        </motion.h2>

        <motion.div className="glass-card teacher-card" variants={fadeUp}>
          <div className="teacher-avatar">MM</div>
          <h3 className="teacher-name gradient-text-blue">Meena Meshram</h3>
          <p className="teacher-role">Founder & Lead Educator</p>
          <p className="teacher-bio">
            With over a decade of teaching experience, Meena Meshram founded Learnix with
            a simple yet powerful vision: to make quality education accessible and enjoyable
            for every student. Her concept-first teaching methodology ensures that students don't
            just memorize — they truly understand. Under her guidance, hundreds of students have
            achieved academic excellence across CBSE, State Board, and other examinations.
          </p>

          <div className="teacher-qualities">
            {qualities.map((q) => (
              <motion.span className="quality-badge" key={q} variants={fadeUp}>
                {q}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
