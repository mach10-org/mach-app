export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      answers: {
        Row: {
          course_slug: string | null
          created_at: string | null
          id: string
          success: boolean | null
          title: string | null
          user: string | null
        }
        Insert: {
          course_slug?: string | null
          created_at?: string | null
          id?: string
          success?: boolean | null
          title?: string | null
          user?: string | null
        }
        Update: {
          course_slug?: string | null
          created_at?: string | null
          id?: string
          success?: boolean | null
          title?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_user_fkey"
            columns: ["user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      availability: {
        Row: {
          date: string | null
          days: number[] | null
          endTime: string
          id: number
          scheduleId: string
          startTime: string
        }
        Insert: {
          date?: string | null
          days?: number[] | null
          endTime: string
          id?: number
          scheduleId: string
          startTime: string
        }
        Update: {
          date?: string | null
          days?: number[] | null
          endTime?: string
          id?: number
          scheduleId?: string
          startTime?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_scheduleId_fkey"
            columns: ["scheduleId"]
            referencedRelation: "schedule"
            referencedColumns: ["id"]
          }
        ]
      }
      goals: {
        Row: {
          active: boolean
          created_at: string | null
          id: string
          label: string
          order: number
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          id?: string
          label?: string
          order?: number
        }
        Update: {
          active?: boolean
          created_at?: string | null
          id?: string
          label?: string
          order?: number
        }
        Relationships: []
      }
      last_url: {
        Row: {
          course: string
          created_at: string | null
          id: string
          main: boolean | null
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          course: string
          created_at?: string | null
          id: string
          main?: boolean | null
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          course?: string
          created_at?: string | null
          id?: string
          main?: boolean | null
          title?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "last_url_id_fkey"
            columns: ["id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      learning: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          quantity: number
          slug: string
          title: string
          user: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          quantity: number
          slug: string
          title?: string
          user: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          quantity?: number
          slug?: string
          title?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_user_fkey"
            columns: ["user"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      learning_lesson: {
        Row: {
          course_id: string
          id: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_lesson_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "learning"
            referencedColumns: ["id"]
          }
        ]
      }
      newsletter: {
        Row: {
          email: string
          updated_at: string | null
        }
        Insert: {
          email: string
          updated_at?: string | null
        }
        Update: {
          email?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about: string | null
          age: string | null
          avatar_url: string | null
          computer_xp: string | null
          devices: string[] | null
          dob: string | null
          education: string | null
          full_name: string | null
          gender: string | null
          goal: string[]
          id: string
          updated_at: string | null
          username: string | null
          xp: number
        }
        Insert: {
          about?: string | null
          age?: string | null
          avatar_url?: string | null
          computer_xp?: string | null
          devices?: string[] | null
          dob?: string | null
          education?: string | null
          full_name?: string | null
          gender?: string | null
          goal?: string[]
          id: string
          updated_at?: string | null
          username?: string | null
          xp?: number
        }
        Update: {
          about?: string | null
          age?: string | null
          avatar_url?: string | null
          computer_xp?: string | null
          devices?: string[] | null
          dob?: string | null
          education?: string | null
          full_name?: string | null
          gender?: string | null
          goal?: string[]
          id?: string
          updated_at?: string | null
          username?: string | null
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      schedule: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          timeZone: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string | null
          timeZone?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          timeZone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedule_id_fkey"
            columns: ["id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
