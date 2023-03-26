<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/store/projects'
import { useRouter } from 'vue-router'
import ProjectFilter from './ProjectFilter.vue'

const router = useRouter()
const projectStore = useProjectStore()

const isFiltered = ref('ID')
const reverseSort = ref(false)

const { filteredProjects } = storeToRefs(projectStore)
const {
  getProjects,
  removeProject,
  sortProjectsByString,
  sortProjectsByNumber,
  sortProjectsByDate
} = useProjectStore()

onMounted(() => {
  getProjects()
})

const filterIcon = computed<string>(() =>
  reverseSort.value ? 'fa-solid fa-arrow-up-wide-short' : 'fa-solid fa-arrow-down-short-wide'
)

function onEdit(id: string | number) {
  router.push(`/add-project/${id}`)
}
function onDelete(id: string | number) {
  removeProject(id)
}

function onSort(filterBy: string) {
  isFiltered.value = filterBy
  reverseSort.value = !reverseSort.value

  switch (filterBy) {
    case 'Name':
      sortProjectsByString('name', reverseSort.value)
      break
    case 'ID':
      sortProjectsByNumber('id', reverseSort.value)
      break
    case 'Status':
      sortProjectsByString('status', reverseSort.value)
      break
    case 'Date due':
      sortProjectsByDate('dateDue', reverseSort.value)
      break
    case 'Source Language':
      sortProjectsByString('sourceLanguage', reverseSort.value)
      break
    case 'Created':
      sortProjectsByDate('dateCreated', reverseSort.value)
      break
  }
}

const titleArray = [
  'ID',
  'Name',
  'Status',
  'Source Language',
  'Target Language',
  'Date due',
  'Created',
  '',
  ''
]
const fullSpan = computed(() => {
  return `grid-column: span ${titleArray.length}`
})
</script>

<template>
  <div class="grid-container">
    <div :style="fullSpan" class="grid-container__filters grid-container__header">
      <ProjectFilter />
    </div>
    <div
      @click="onSort(title)"
      v-for="(title, index) in titleArray"
      :class="{ filteredBy: isFiltered === title }"
      :key="index"
      class="grid-container__header"
    >
      <span class="clickable">{{ title }}</span>
      <font-awesome-icon
        v-if="isFiltered === title && title.length > 0"
        class="clickable icon"
        :icon="filterIcon"
      />
    </div>

    <div v-for="project in filteredProjects" :key="project.id" class="wrapper">
      <div class="grid-item">{{ project.id }}</div>
      <div class="grid-item">{{ project.name }}</div>
      <div class="grid-item">{{ project.status }}</div>
      <div class="grid-item">{{ project.sourceLanguage }}</div>
      <div class="grid-item">{{ project.targetLanguages.join(', ') }}</div>
      <div class="grid-item">{{ new Date(project.dateDue).toLocaleDateString() }}</div>
      <div class="grid-item">{{ new Date(project.dateCreated).toLocaleDateString() }}</div>
      <div class="grid-item">
        <font-awesome-icon
          @click="onEdit(project.id)"
          class="clickable"
          icon="fa-solid fa-pen-to-square"
        />
      </div>
      <div class="grid-item">
        <font-awesome-icon
          @click="onDelete(project.id)"
          class="clickable"
          icon="fa-solid fa-trash"
        />
      </div>
    </div>

    <div :style="fullSpan" v-if="filteredProjects.length == 0" class="info">No projects found.</div>
  </div>
  <div class="footer">
    <RouterLink to="/add-project"><button class="btn btn-primary">Add Project</button></RouterLink>
  </div>
</template>

<style scoped lang="scss">
$column-full-span: span 9;
.grid-container {
  $header-bg-color: rgb(241, 241, 241);

  display: grid;
  grid-template-columns: minmax(75px, auto) repeat(6, 1fr) minmax(50px, auto) minmax(50px, auto);
  grid-auto-rows: minmax(40px, auto);
  gap: 0;
  align-items: center;
  justify-items: end;

  &__header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $header-bg-color;
    height: 100%;
    user-select: none;

  }

  &__filters {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 60px;
    background-color: $header-bg-color;
  }

}

.footer {
  display: flex;
  width: 100%;
  justify-content: end;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    height: 36px;
  }
}

.wrapper {
  display: contents;
}

.wrapper:hover > div {
  background-color: #f5f5f5;
}

.info {
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 24px auto;
}
.clickable {
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #000000;
  }
}

.filteredBy {
  color: #3a3a3a;
  font-weight: bold;
}

.icon {
  margin-left: 5px;
}
</style>
