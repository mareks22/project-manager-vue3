<script setup lang="ts">
import type { Project } from '@/model'
import { ProjectStatus } from '@/model'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useProjectStore } from '@/store/projects'
import { supabase } from '@/lib/supabase'

const { addNewProject, projects, editByIdProject } = useProjectStore()

const route = useRoute()
const projectEditing = projects.find((p) => p.id === parseInt(route.params.id as string))

const isEditing = computed(() => {
  return !!projectEditing
})
const buttonText = computed(() => {
  return isEditing.value ? 'edit' : 'addProject'
})

const statusOptions = computed(() => [
  ProjectStatus.NEW,
  ProjectStatus.COMPLETED,
  ProjectStatus.DELIVERED
])

const hasError = ref(false)

const ids = ref<number[]>([])
async function getIds() {

  let { data, error } = await supabase
  .from('projects')
  .select('id')
  if(data) {
    ids.value = data.map(obj => obj.id)
  }
}
  
const form = ref({
  name: '',
  status: ProjectStatus.NEW,
  dateDue: '',
  sourceLanguage: '',
  targetLanguages: ''
})

//populate form if in editing mode
onMounted(() => {
  getIds()
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
    id: Math.max(...ids.value)+1,
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
    return { ...newProject, dateUpdated: null, dateCreated: new Date().toISOString() }
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
  hasError.value = false

  if (
    !form.value.name ||
    !form.value.sourceLanguage ||
    !form.value.targetLanguages ||
    !form.value.dateDue
  ) {
    hasError.value = true
  } else {
    const newProject = createNewProject()
    if (projectEditing) {
      editByIdProject(projectEditing.id, newProject)
    } else {
      addNewProject(newProject)
    }
    goBack()
  }
}

//navigation back

const router = useRouter()
function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="wrapper">
    <h1>{{ $t(buttonText) }}</h1>
    <form ref="form" class="project-form" @submit.prevent="onSubmit()">
      <label>{{$t('name')}}</label>
      <input class="project-form__input input" type="text" v-model="form.name" />
      <p class="error" v-if="hasError && !form.name">Please enter a name.</p>

      <label>{{$t('status')}}</label
      ><select class="project-form__input input" v-model="form.status">
        <option v-for="status in statusOptions" :value="status" :key="status">{{ status }}</option>
      </select>
      <p class="error" v-if="hasError && !form.status">Please enter a status.</p>

      <label>{{$t('sourceLanguage')}}</label
      ><input class="project-form__input input" type="text" v-model="form.sourceLanguage" />
      <p class="error" v-if="hasError && !form.sourceLanguage">Please enter a source language.</p>

      <label>{{$t('targetLanguage')}} {{$t('commaSeparated')}}</label
      ><input class="project-form__input input" type="text" v-model="form.targetLanguages" />
      <p class="error" v-if="hasError && !form.targetLanguages">Please enter a target language.</p>

      <label>{{$t('dateDue')}}</label
      ><input class="project-form__input input" type="date" v-model="form.dateDue" />
      <p class="error" v-if="hasError && !form.dateDue">Please enter a due date.</p>
      <div class="project-form__buttons">
        <button @click="goBack()" class="btn btn-secondary" type="button">{{$t('back')}}</button>
        <button class="btn btn-primary" type="submit">{{ $t(buttonText) }}</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 24px;


}

.project-form {
  &__input {
    width: 100%;

    option {
      min-height: 1.2em;
      padding: 0px 2px 1px;
    }
  }
}

.project-form__buttons {
  display: flex;
  justify-content: space-around;
  .btn {
    margin: 16px 10px;
  }
}

label {
  padding-top: 15px;
  display: inline-block;
  text-align: left;
}

h1 {
  font-weight: 600;
}

.error {
  color: red;
  font-size: 14px;
  font-weight: 400;
}
</style>
