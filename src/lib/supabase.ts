import { createClient } from '@supabase/supabase-js'

// VITE_SUPABASE_URL= 'https://xucltoehvvrtteqftvfb.supabase.co'
// VITE_SUPABASE_ANON_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Y2x0b2VodnZydHRlcWZ0dmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAx
// MTgwOTEsImV4cCI6MTk5NTY5NDA5MX0.cMoODARyENw-cAj7etg7G7UCKULHyGRft1RDUcnUWNc"

import type { Database} from 'db_types'

const supabaseUrl = 'https://xucltoehvvrtteqftvfb.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Y2x0b2VodnZydHRlcWZ0dmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMTgwOTEsImV4cCI6MTk5NTY5NDA5MX0.cMoODARyENw-cAj7etg7G7UCKULHyGRft1RDUcnUWNc"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)