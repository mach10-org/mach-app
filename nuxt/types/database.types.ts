export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

