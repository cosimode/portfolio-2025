import { createClient } from '@supabase/supabase-js'

// Prende le chiavi dal file .env (che creeremo tra poco)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)