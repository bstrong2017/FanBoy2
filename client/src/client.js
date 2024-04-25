import { createClient } from '@supabase/supabase-js';

const URL = 'https://xozssmqxwxoalnpazzeb.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvenNzbXF4d3hvYWxucGF6emViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4OTM5OTMsImV4cCI6MjAyODQ2OTk5M30.5r3luyFBnSh0nHkBWd2TyVG2aI1g9WP0bgkpoNk2pkE';

export const supabase = createClient(URL, API_KEY);


