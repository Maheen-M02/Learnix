-- Run this SQL in the Neon Console SQL Editor to create the enquiries table
-- https://console.neon.tech → Your Project → SQL Editor

CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  student_class VARCHAR(10) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
