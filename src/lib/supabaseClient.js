// One place that knows about Supabase. If the two environment variables are
// absent, the app is in local-only mode and nothing here is ever called —
// cloudEnabled() is how the rest of the app asks which world it lives in.

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env?.VITE_SUPABASE_URL;
const key = import.meta.env?.VITE_SUPABASE_ANON_KEY;

export function cloudEnabled() {
  return Boolean(url && key);
}

let client = null;
export function supabase() {
  if (!cloudEnabled()) return null;
  if (!client) client = createClient(url, key);
  return client;
}

// --- coach sign-in (magic link: tap the email, no password) ---
export async function signInWithEmail(email) {
  const { error } = await supabase().auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin },
  });
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase().auth.getSession();
  return data.session || null;
}

export function onAuthChange(cb) {
  const { data } = supabase().auth.onAuthStateChange((_e, session) => cb(session));
  return () => data.subscription.unsubscribe();
}

export async function signOut() {
  await supabase().auth.signOut();
}
