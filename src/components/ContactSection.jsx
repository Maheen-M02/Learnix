import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const contactInfo = [
  {
    icon: '📞',
    title: 'Phone',
    text: '+91 83080 68823',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    text: 'Chat with us on WhatsApp',
    isWhatsApp: true,
  },
  {
    icon: '📧',
    title: 'Email',
    text: 'meenaraj.meshram@gmail.com',
  },
  {
    icon: '📍',
    title: 'Address',
    text: 'Learnix Coaching Classes, Star City, Bld no 25, Shirwal',
  },
]

function Toast({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        padding: '16px 28px',
        borderRadius: 14,
        fontSize: '0.95rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        background: type === 'success' ? '#e8faf0' : '#fde8e8',
        color: type === 'success' ? '#1a7f4b' : '#b91c1c',
        border: `1.5px solid ${type === 'success' ? '#a7f3d0' : '#fca5a5'}`,
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>{type === 'success' ? '✅' : '❌'}</span>
      {message}
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.1rem',
          marginLeft: 8,
          color: 'inherit',
          opacity: 0.6,
        }}
      >
        ✕
      </button>
    </motion.div>
  )
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          studentClass: formData.class,
          message: formData.message,
        }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', class: '', message: '' })
        showToast('Enquiry submitted! We\'ll contact you shortly.', 'success')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        throw new Error(data.error || 'Submission failed')
      }
    } catch (err) {
      setStatus('error')
      showToast(err.message || 'Something went wrong. Please try again.', 'error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="contact-section section" id="contact">
      <motion.div
        className="section-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
      >
        <motion.div style={{ textAlign: 'center', marginBottom: 56 }} variants={fadeUp}>
          <span className="section-label">Contact</span>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            Start Your <span className="gradient-text">Journey</span> Today
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Ready to give your child the academic edge? Reach out to us — we'd love to help.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Form */}
          <motion.form
            className="glass-card contact-form-card"
            onSubmit={handleSubmit}
            variants={fadeUp}
          >
            <div className="form-group">
              <label htmlFor="name">Student / Parent Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="class">Student's Class</label>
              <select
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="">Select class</option>
                <option value="1">Std 1</option>
                <option value="2">Std 2</option>
                <option value="3">Std 3</option>
                <option value="4">Std 4</option>
                <option value="5">Std 5</option>
                <option value="6">Std 6</option>
                <option value="7">Std 7</option>
                <option value="8">Std 8</option>
                <option value="9">Std 9</option>
                <option value="10">Std 10</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                placeholder="Any specific questions or requirements..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="glow-btn"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={status === 'loading'}
            >
              {status === 'loading' && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 18,
                    height: 18,
                    border: '2.5px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    marginRight: 8,
                  }}
                />
              )}
              {status === 'loading'
                ? 'Submitting...'
                : status === 'success'
                  ? '✓ Sent Successfully!'
                  : 'Send Enquiry →'}
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div className="contact-info-area" variants={stagger}>
            {contactInfo.map((info) => (
              <motion.div className="glass-card contact-info-card" key={info.title} variants={fadeUp}>
                <div className="contact-info-icon">{info.icon}</div>
                <div className="contact-info-text">
                  <h4>{info.title}</h4>
                  <p>{info.text}</p>
                </div>
              </motion.div>
            ))}

            <motion.a
              href="https://wa.me/918668583648?text=Hi%2C%20I%27m%20interested%20in%20Learnix%20coaching%20classes"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn whatsapp-btn"
              style={{ width: '100%', justifyContent: 'center', textAlign: 'center', display: 'flex' }}
              variants={fadeUp}
            >
              💬 Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
