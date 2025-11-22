import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // url pessoal do projeto
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // código API do projeto

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase