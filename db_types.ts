import type { ProjectStatus } from "@/model"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          dateCreated: string
          dateDue: string
          id: number
          name: string
          sourceLanguage: string
          status: ProjectStatus
          targetLanguages: string[]
          dateUpdated: string | null
        }
        Insert: {
          dateCreated: string 
          dateDue?: string 
          id: number
          name: string 
          sourceLanguage: string 
          status: ProjectStatus 
          targetLanguages: string[],
          dateUpdated?: string | null
        }
        Update: {
            dateCreated: string 
            dateDue?: string 
            id: number
            name: string 
            sourceLanguage: string 
            status: ProjectStatus 
            targetLanguages: string[],
            dateUpdated: string | null
        }
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
