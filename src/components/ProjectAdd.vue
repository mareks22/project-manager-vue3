<script setup lang="ts">
import type { Project } from '@/model'
import {ProjectStatus } from '@/model'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProjectStore } from '@/store/projects'

const { addNewProject, projects, editByIdProject } = useProjectStore()

const route = useRoute()
const projectEditing = projects.find((p) => p.id === parseInt(route.params.id as string))

const isEditing = computed(() => {
  return !!projectEditing
})
const buttonText = computed(() => {
  return isEditing.value ? 'Edit' : 'Add Project'
})

const statusOptions = computed(() => [
  ProjectStatus.NEW,
  ProjectStatus.COMPLETED,
  ProjectStatus.DELIVERED
])


const form = ref({
  name: '',
  status: ProjectStatus.NEW,
  dateDue: '',
  sourceLanguage: '',
  targetLanguages: ''
})

//populate form if in editing mode
onMounted(() => {
  if (projectEditing) {
    form.value.name = projectEditing.name
    form.value.status = projectEditing.status
    form.value.sourceLanguage = projectEditing.sourceLanguage
    form.value.targetLanguages = projectEditing.targetLanguages.join(',')
    form.value.dateDue = formatDate(projectEditing.dateDue)
  }
})

//submit handler
function createNewProject(): Project {
  const targetLangArray = form.value.targetLanguages.split(',')
  const newProject = {
    id: Math.random(),
    name: form.value.name,
    status: form.value.status,
    dateDue: new Date(form.value.dateDue).toISOString(),
    dateCreated: new Date().toISOString(),
    sourceLanguage: form.value.sourceLanguage,
    targetLanguages: targetLangArray
  }

  if (isEditing.value) {
    return { ...newProject, dateUpdated: new Date().toISOString() }
  } else {
    return { ...newProject, dateCreated: new Date().toISOString() }
  }
}

function formatDate(myDate: string) {
  const date = new Date(myDate)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function onSubmit() {
  const newProject = createNewProject()
  console.log(newProject.targetLanguages)

  if (projectEditing) {
    editByIdProject(projectEditing.id, newProject)
  } else {
    addNewProject(newProject)
  }

  goBack()
}

//navigation back

const router = useRouter()
function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="wrapper">
    <form ref="form" class="project-form" @submit.prevent="onSubmit()">
      <label>Name</label><input class="project-form__input input" type="text" v-model="form.name" />

      <label>Status</label
      ><select class="project-form__input input" v-model="form.status">
        <option v-for="status in statusOptions" :value="status" :key="status">{{status}}</option>
      </select>

      <label>Source Language</label
      ><input class="project-form__input input" type="text" v-model="form.sourceLanguage" />

      <label>Target Languages</label
      ><input class="project-form__input input" type="text" v-model="form.targetLanguages" />

      <label>Date due:</label
      ><input class="project-form__input input" type="date" v-model="form.dateDue" />
      <div class="project-form__buttons">
        <button @click="goBack()" class="btn btn-secondary" type="button">Back</button>
        <button class="btn btn-primary" type="submit">{{buttonText}}</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background-color: rgb(43, 42, 42);
  border-radius: 24px;
  padding: 24px;
}

.project-form {
  &__input {
    margin-bottom: 15px;
    width: 100%;
    option {
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
  }
}

.project-form__buttons {
  .btn {
    margin: 10px;
  }
}

label {
  text-align: left;
}
</style>
