import { defineStore } from 'pinia'

import { useHttpService } from '@/service/httpService'
import type { Project } from '@/model'

const { fetchProjects, deleteProject, addProject, editProject } = useHttpService()

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[]
  }),
  actions: {
    getProjects() {
      fetchProjects().then((res) =>
        res.json().then((response) => {
          this.projects = response._embedded.projects
        })
      )
    },
    removeProject(id: string | number) {
      deleteProject(id).then(() => this.getProjects())
    },

    addNewProject(payload: Project) {
      addProject(payload).then(() => this.getProjects())
    },

    editByIdProject(id: number | string, payload: Project) {
      editProject(id, payload).then(() => this.getProjects())
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
  }
})
