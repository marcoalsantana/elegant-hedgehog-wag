import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://pirsuaxrmclehjycwass.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcnN1YXhybWNsZWhqeWN3YXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MjI2MTgsImV4cCI6MjA5NDE5ODYxOH0.Qd_tmNlWh2mR0P5Dh-_5rYG8KjMDZFXSSA08aAEhwlo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);