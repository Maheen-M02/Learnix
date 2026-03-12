import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { neon } from '@neondatabase/serverless'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Neon DB connection
const sql = neon(process.env.DATABASE_URL)

// Auto-create table on startup
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20) NOT NULL,
        student_class VARCHAR(10) NOT NULL,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
    console.log('✅ Database table ready')
  } catch (err) {
    console.error('❌ Failed to initialize database:', err.message)
  }
}

// POST /api/enquiry — Store a new enquiry
app.post('/api/enquiry', async (req, res) => {
  try {
    const { name, email, phone, studentClass, message } = req.body

    // Validation
    if (!name || !phone || !studentClass) {
      return res.status(400).json({
        success: false,
        error: 'Name, phone, and class are required fields.',
      })
    }

    // Insert into Neon
    const result = await sql`
      INSERT INTO enquiries (name, email, phone, student_class, message)
      VALUES (${name}, ${email || null}, ${phone}, ${studentClass}, ${message || null})
      RETURNING id, created_at
    `

    console.log(`📩 New enquiry from ${name} (Std ${studentClass})`)

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: { id: result[0].id, created_at: result[0].created_at },
    })
  } catch (err) {
    console.error('❌ Error saving enquiry:', err.message)
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    })
  }
})

// GET /api/enquiries — Fetch all enquiries (admin use)
app.get('/api/enquiries', async (req, res) => {
  try {
    const rows = await sql`
      SELECT * FROM enquiries ORDER BY created_at DESC
    `
    res.json({ success: true, data: rows })
  } catch (err) {
    console.error('❌ Error fetching enquiries:', err.message)
    res.status(500).json({ success: false, error: 'Failed to fetch enquiries.' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Learnix API running on http://localhost:${PORT}`)
  await initDB()
})
