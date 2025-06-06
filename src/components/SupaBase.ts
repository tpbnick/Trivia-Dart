import { createClient, SupabaseClient } from "@supabase/supabase-js";

if (!import.meta.env.VITE_SUPABASE_URL) {
	throw new Error("Missing VITE_SUPABASE_URL environment variable");
}

if (!import.meta.env.VITE_SUPABASE_APIKEY) {
	throw new Error("Missing VITE_SUPABASE_APIKEY environment variable");
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_APIKEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
	},
});

// Type guard to check if Supabase is properly initialized
export const isSupabaseInitialized = (): boolean => {
	return !!supabase && !!supabaseUrl && !!supabaseKey;
};

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: unknown): string => {
	if (error instanceof Error) {
		console.error("Supabase error:", error);
		return error.message;
	}
	return "An unknown error occurred with Supabase";
};
