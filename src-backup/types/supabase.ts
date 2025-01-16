// src/types/supabase.ts
export type Database = {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string
            email: string
            full_name: string | null
            role: 'buyer' | 'supplier'
            created_at: string
            updated_at: string
          }
          Insert: {
            id: string
            email: string
            full_name?: string | null
            role: 'buyer' | 'supplier'
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            email?: string
            full_name?: string | null
            role?: 'buyer' | 'supplier'
            created_at?: string
            updated_at?: string
          }
        }
        // Add other tables here
      }
    }
  }