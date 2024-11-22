
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.URL;
const supabaseKey = process.env.ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
        