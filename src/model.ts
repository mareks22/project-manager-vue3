export interface Project {
  id: string | number
  name: string
  status: ProjectStatus
  sourceLanguage: string
  dateDue: string
  dateCreated: string
  dateUpdated?: string
  targetLanguages: string[]
    // Add an index signature to allow accessing properties using bracket notation
    [key: string]: any;
}

export enum ProjectStatus {
  NEW = 'NEW',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
}
