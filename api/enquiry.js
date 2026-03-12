import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const sql = neon(process.env.DATABASE_URL)

    // Auto-create table if not exists
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

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: { id: result[0].id, created_at: result[0].created_at },
    })
  } catch (err) {
    console.error('Error saving enquiry:', err.message)
    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again later.',
    })
  }
}
