import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.https://avmugzmqnpgyfaatmwye.supabase.co;
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2bXVnem1xbnBneWZhYXRtd3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NjEyNzYsImV4cCI6MjA1MTUzNzI3Nn0.82uZLcO37oNFemSLP_Njj2ufTR9lfzkvLzs9DcJfRM4;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
