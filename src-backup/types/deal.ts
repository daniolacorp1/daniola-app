// src/types/deal.ts
export interface Deal {
    id: number;
    title: string;
    description: string;
    status: string;
    value: string;
    timeline: string;
    category: string;
    documents?: any[];
    updates?: any[];
    tasks?: any[];
  }