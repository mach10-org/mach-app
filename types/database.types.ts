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
          created_at: string
          id: string
          is_correct: boolean
          label: string
          slug: string
          slug_course: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_correct: boolean
          label?: string
          slug?: string
          slug_course?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_correct?: boolean
          label?: string
          slug?: string
          slug_course?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      last_url: {
        Row: {
          created_at: string | null
          id: string
          main: boolean
          title: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id: string
          main?: boolean
          title: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          main?: boolean
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
      learning_lesson: {
        Row: {
          created_at: string
          slug: string
          slug_course: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          slug: string
          slug_course: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          slug?: string
          slug_course?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_lesson_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
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
          created_at: string | null
          devices: string[] | null
          dob: string | null
          education: string | null
          full_name: string | null
          gender: string | null
          goal: string[]
          has_been_asked_to_set_schedule: boolean
          id: string
          timezone: string | null
          updated_at: string | null
          username: string | null
          xp: number
        }
        Insert: {
          about?: string | null
          age?: string | null
          avatar_url?: string | null
          computer_xp?: string | null
          created_at?: string | null
          devices?: string[] | null
          dob?: string | null
          education?: string | null
          full_name?: string | null
          gender?: string | null
          goal?: string[]
          has_been_asked_to_set_schedule?: boolean
          id: string
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
          xp?: number
        }
        Update: {
          about?: string | null
          age?: string | null
          avatar_url?: string | null
          computer_xp?: string | null
          created_at?: string | null
          devices?: string[] | null
          dob?: string | null
          education?: string | null
          full_name?: string | null
          gender?: string | null
          goal?: string[]
          has_been_asked_to_set_schedule?: boolean
          id?: string
          timezone?: string | null
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
          day: number
          end: string
          id: number
          start: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          day: number
          end: string
          id?: number
          start: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          day?: number
          end?: string
          id?: number
          start?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule_user_id_fkey"
            columns: ["user_id"]
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

