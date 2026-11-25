export interface PublicEnvStatus {
  hasSupabaseUrl: boolean
  hasSupabaseAnonKey: boolean
  isSupabaseEnvReady: boolean
}

/**
 * Membaca status konfigurasi environment publik tanpa melempar error
 * dan tanpa mengekspos nilai secret ke UI.
 */
export function getPublicEnvStatus(): PublicEnvStatus {
  const url = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
  const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

  return {
    hasSupabaseUrl: url.length > 0,
    hasSupabaseAnonKey: anonKey.length > 0,
    isSupabaseEnvReady: url.length > 0 && anonKey.length > 0,
  }
}
