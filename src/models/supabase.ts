export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      answers: {
        Row: {
          course_slug: string | null;
          created_at: string | null;
          id: string;
          success: boolean | null;
          title: string | null;
          user: string | null;
        };
        Insert: {
          course_slug?: string | null;
          created_at?: string | null;
          id?: string;
          success?: boolean | null;
          title?: string | null;
          user?: string | null;
        };
        Update: {
          course_slug?: string | null;
          created_at?: string | null;
          id?: string;
          success?: boolean | null;
          title?: string | null;
          user?: string | null;
        };
      };
      goals: {
        Row: {
          active: boolean;
          created_at: string | null;
          id: string;
          label: string;
          order: number;
        };
        Insert: {
          active?: boolean;
          created_at?: string | null;
          id?: string;
          label?: string;
          order?: number;
        };
        Update: {
          active?: boolean;
          created_at?: string | null;
          id?: string;
          label?: string;
          order?: number;
        };
      };
      learning: {
        Row: {
          completed: boolean;
          created_at: string;
          id: string;
          quantity: number;
          slug: string;
          title: string;
          user: string;
        };
        Insert: {
          completed?: boolean;
          created_at?: string;
          id?: string;
          quantity: number;
          slug: string;
          title?: string;
          user: string;
        };
        Update: {
          completed?: boolean;
          created_at?: string;
          id?: string;
          quantity?: number;
          slug?: string;
          title?: string;
          user?: string;
        };
      };
      learning_lesson: {
        Row: {
          course_id: string;
          id: string;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          course_id: string;
          id?: string;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          course_id?: string;
          id?: string;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
      };
      newsletter: {
        Row: {
          email: string;
          inserted_at: string;
        };
        Insert: {
          email: string;
          inserted_at?: string;
        };
        Update: {
          email?: string;
          inserted_at?: string;
        };
      };
      profiles: {
        Row: {
          about: string | null;
          avatar_url: string | null;
          computer_xp: string | null;
          dob: string | null;
          education: string | null;
          full_name: string | null;
          gender: string | null;
          goal: string[];
          id: string;
          age: string | null;
          updated_at: string | null;
          username: string | null;
          devices: string[];
          xp: number;
        };
        Insert: {
          about?: string | null;
          avatar_url?: string | null;
          computer_xp?: string | null;
          dob?: string | null;
          education?: string | null;
          full_name?: string | null;
          gender?: string | null;
          goal?: string[];
          id: string;
          age?: string | null;
          updated_at?: string | null;
          username?: string | null;
          devices?: string[];
          xp?: number;
        };
        Update: {
          about?: string | null;
          avatar_url?: string | null;
          computer_xp?: string | null;
          dob?: string | null;
          education?: string | null;
          full_name?: string | null;
          gender?: string | null;
          goal?: string[];
          id?: string;
          age?: string | null;
          updated_at?: string | null;
          username?: string | null;
          devices?: string[];
          xp?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
