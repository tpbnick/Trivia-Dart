import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://jzpmvgewvzbumesuozcl.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY
export const supabase = createClient(supabaseUrl, supabaseKey)
