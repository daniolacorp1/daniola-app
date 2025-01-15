// src/types/user.ts
export interface User {
    id: string;
    email: string;
    full_name?: string;
    role?: 'buyer' | 'supplier';
    created_at?: string;
    updated_at?: string;
  }