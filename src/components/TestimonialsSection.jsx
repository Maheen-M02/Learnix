import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}

const testimonials = [
  {
    quote: "My daughter's math scores improved dramatically within just three months at Learnix. Meena ma'am has an incredible way of making complex concepts feel simple and fun.",
    name: 'Priya Sharma',
    class: 'Parent of Std 6 Student',
    initials: 'PS',
  },
  {
    quote: "Learnix transformed my approach to studies. Instead of cramming, I now understand the concepts deeply. I scored 95% in my board exams thanks to the preparation here.",
    name: 'Arjun Patel',
    class: 'Std 10, CBSE — 95%',
    initials: 'AP',
  },
  {
    quote: "The small batch sizes make a real difference. My son gets personalized attention, and the regular tests keep us informed about his progress. Highly recommended!",
    name: 'Sunita Verma',
    class: 'Parent of Std 4 Student',
    initials: 'SV',
  },
  {
    quote: "I was struggling with Science, but Meena ma'am made it so interesting with her concept-based teaching. Now it's my favorite subject! Learnix is the best.",
    name: 'Riya Deshmukh',
    class: 'Std 8, State Board',
    initials: 'RD',
  },
  {
    quote: "Excellent coaching institute. The teaching quality, study material, and regular assessments are top-notch. My child has become more confident and self-driven.",
    name: 'Rahul Joshi',
    class: 'Parent of Std 9 Student',
    initials: 'RJ',
  },
  {
    quote: "The doubt-clearing sessions are a lifesaver before exams. Ma'am is always patient and explains everything until we understand. Best coaching classes in the area!",
    name: 'Sneha Kulkarni',
    class: 'Std 7, CBSE',
    initials: 'SK',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section section" id="testimonials">
      <motion.div
        className="section-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.span className="section-label" variants={fadeUp}>Testimonials</motion.span>
        <motion.h2 className="section-title" variants={fadeUp}>
          What <span className="gradient-text">Families</span> Say
        </motion.h2>
        <motion.p className="section-subtitle" style={{ margin: '0 auto' }} variants={fadeUp}>
          Real stories from parents and students who've experienced the Learnix difference.
        </motion.p>

        <motion.div
          className="testimonials-track"
          variants={fadeUp}
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
          style={{ cursor: 'grab' }}
        >
          {testimonials.map((t) => (
            <div className="glass-card testimonial-card" key={t.name}>
              <div className="quote-icon">"</div>
              <p className="quote-text">{t.quote}</p>
              <div className="student-info">
                <div className="student-avatar">{t.initials}</div>
                <div>
                  <div className="student-name">{t.name}</div>
                  <div className="student-class">{t.class}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>        <div className="swipe-hint">
          Swipe to read more <span className="swipe-arrow">→</span>
        </div>      </motion.div>
    </section>
  )
}
