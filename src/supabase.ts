import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) throw new Error("SUPABASE_URL is not defined in .env file");
if (!supabaseAnonKey) throw new Error("SUPABASE_KEY is not defined in .env file");
if (!supabaseServiceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined in .env file");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
