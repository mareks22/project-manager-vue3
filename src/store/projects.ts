import { defineStore } from 'pinia'

//import { useHttpService } from '@/service/httpService'
import type { Project, ProjectStatus } from '@/model'
import { supabase } from '@/lib/supabase'

//const { fetchProjects, deleteProject, addProject, editProject } = useHttpService()

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    searchQuery: '',
    selectedStatus: '' as ProjectStatus | ''
  }),
  actions: {
    async getProjects() {
      const { data, error } = await supabase.from('projects').select('*')
      if (data !== null) {
        this.projects = data
      }

      if (error) {
        console.error(error)
      }
    },
    async removeProject(id: number) {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) {
        console.error(error)
      }
      this.getProjects()
    },

    async addNewProject(payload: Project) {
      const { error } = await supabase.from('projects').insert({ ...payload })
      if (error) {
        console.error(error)
      }
      this.getProjects()
    },

    // addNewProject(payload: Project) {
    //   addProject(payload).then(() => this.getProjects())
    // },

    async editByIdProject(id: number, payload: Project) {
      const { error } = await supabase
        .from('projects')
        .update({ ...payload })
        .eq('id', id)

      if (error) {
        console.error(error)
      }
      this.getProjects()
      //editProject(id, payload).then(() => this.getProjects())
    },

    sortProjectsByString(key: string, reverse: boolean) {
      this.projects.sort((a, b) =>
        reverse ? b[key].localeCompare(a[key]) : a[key].localeCompare(b[key])
      )
    },

    sortProjectsByNumber(key: string, reverse: boolean) {
      this.projects.sort((a, b) => (reverse ? b[key] - a[key] : a[key] - b[key]))
    },

    sortProjectsByDate(key: string, reverse: boolean) {
      this.projects.sort((a, b) =>
        reverse
          ? new Date(b[key]).getTime() - new Date(a[key]).getTime()
          : new Date(a[key]).getTime() - new Date(b[key]).getTime()
      )
    }
  },
  getters: {
    filteredProjects: (state) => {
      const nameQuery = state.searchQuery.toLowerCase().trim()
      const statusQuery = state.selectedStatus
      if (nameQuery === '' && statusQuery === '') {
        return state.projects
      }
      return state.projects.filter(
        (project) =>
          project.name.toLowerCase().includes(nameQuery) &&
          (statusQuery === '' || project.status === statusQuery)
      )
    }
  }
})
