import type { Project } from '@/model'

export function useHttpService() {
  const url = 'http://localhost:8090/'

  function fetchProjects() {
    return fetch(url + 'projects', { method: 'GET' })
  }

  function deleteProject(id: string | number) {
    return fetch(url + `projects/${id}`, { method: 'DELETE' })
  }

  function editProject(id: string | number, payload: Project) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }

    return fetch(url + `projects/${id}`, requestOptions)
  }

  function addProject(payload: Project) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }

    return fetch(url + 'projects', requestOptions)
  }

  return { fetchProjects, deleteProject, addProject, editProject }
}
