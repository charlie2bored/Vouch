import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        async getAll() {
          // For Next.js 16 compatibility - cookies() returns a Promise
          const allCookies = await cookieStore
          return Array.from(allCookies).map(([name, cookie]) => ({
            name,
            value: cookie.value
          }))
        },
        async setAll(cookiesToSet: any) {
          try {
            const resolvedCookieStore = await cookieStore
            for (const { name, value, options } of cookiesToSet) {
              resolvedCookieStore.set(name, value, options)
            }
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}