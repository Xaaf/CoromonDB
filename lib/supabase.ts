import { createClient } from "@supabase/supabase-js";

/**
 * Utility reference to the Supabase client.
 */
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);