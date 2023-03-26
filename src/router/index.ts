import ProjectAdd from '@/components/ProjectAdd.vue'
import ProjectDashboard from '@/components/ProjectDashboard.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProjectDashboard
  },
  {
    path: '/add-project',
    name: 'Add Project',
    component: ProjectAdd
  },
  {
    path: '/add-project/:id',
    name: 'Edit',
    component: ProjectAdd
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
