import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://krozefqbeuloreitumly.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyb3plZnFiZXVsb3JlaXR1bWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3Nzk1ODIsImV4cCI6MjA2OTM1NTU4Mn0.mTlFFeT6f0v90GxirA3oTNGbrlGnbf_NDj1HMG01XJ8"

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  read_time: string
  category: string
  image: string | null
  created_at: string
  updated_at: string
}
