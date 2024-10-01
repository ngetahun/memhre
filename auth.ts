import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export const auth = async ({ cookieStore }: { cookieStore: any }) => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error('AuthSessionMissingError: Auth session missing');
  }
  return data.user;
};
