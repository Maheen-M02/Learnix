import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

const courses = [
  {
    level: 'Primary',
    name: 'Std 1–4 · Foundations',
    icon: '🌱',
    desc: 'Building strong basics with fun, interactive learning. We nurture curiosity and develop core skills in Math, English, Science, and more.',
    topics: ['Fun concept-based learning', 'Activity-driven approach', 'Math & language fundamentals', 'Creative thinking exercises'],
  },
  {
    level: 'Middle School',
    name: 'Std 5–7 · Concept Building',
    icon: '🔬',
    desc: 'Deepening understanding with structured learning. Students develop analytical thinking and subject mastery to prepare for higher classes.',
    topics: ['Advanced math concepts', 'Science experiments & theory', 'English comprehension skills', 'Social studies & reasoning'],
  },
  {
    level: 'Secondary',
    name: 'Std 8–10 · Board Preparation',
    icon: '🏆',
    desc: 'Intensive, board-focused preparation with exam strategies, regular tests, and personalized mentoring for top results.',
    topics: ['Board exam preparation', 'Regular mock tests', 'Doubt-clearing sessions', 'Performance tracking & reports'],
  },
]

export default function CoursesSection() {
  return (
    <section className="courses-section section" id="courses">
      <motion.div
        className="section-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>Programs</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          Structured <span className="gradient-text">Learning Paths</span>
        </motion.h2>
        <motion.p className="section-subtitle" style={{ margin: '0 auto' }} variants={fadeUp}>
          Three focused programs designed to match each student's developmental stage,
          ensuring continuous growth from primary to secondary school.
        </motion.p>

        <motion.div className="courses-grid" variants={stagger}>
          {courses.map((course) => (
            <motion.div className="glass-card course-card" key={course.name} variants={fadeUp}>
              <div className="course-icon">{course.icon}</div>
              <div className="course-level">{course.level}</div>
              <h3 className="course-name">{course.name}</h3>
              <p className="course-desc">{course.desc}</p>
              <ul className="course-topics">
                {course.topics.map((topic) => (
                  <li key={topic}>
                    <span className="check">✦</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
