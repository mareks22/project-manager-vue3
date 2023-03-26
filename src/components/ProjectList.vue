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

const titleArray = ['ID', 'Name', 'Status', 'Source Language', 'Target Language', 'Date due', 'Created', '', '']
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
      class="grid-container__header clickable"
    >
      {{ title }}
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

  <!-- <table class="projects-table">
    <tr class="header">
      <th
        @click="onFilter(title)"
        v-for="(title, index) in titleArray"
        :class="{ filteredBy: isFiltered === title }"
        :key="index"
        class="clickable"
      >
        {{ title }}
        <font-awesome-icon
          v-if="isFiltered === title && title.length > 0"
          class="clickable icon"
          :icon="filterIcon"
        />
      </th>
    </tr>
    <tr v-for="project in projects" :key="project.id">
      <td>{{ project.id }}</td>
      <td>{{ project.name }}</td>
      <td>{{ project.status }}</td>
      <td>{{ new Date(project.dateDue).toLocaleDateString() }}</td>
      <td>{{ new Date(project.dateCreated).toLocaleDateString() }}</td>
      <td style="max-width: 50px;">
        <font-awesome-icon
          @click="onEdit(project.id)"
          class="clickable"
          icon="fa-solid fa-pen-to-square"
        />
      </td>
      <td>
        <font-awesome-icon
          @click="onDelete(project.id)"
          class="clickable"
          icon="fa-solid fa-trash"
        />
      </td>
    </tr>
  </table> -->
  <div class="footer">
    <RouterLink to="/add-project"><button class="btn btn-primary">Add Project</button></RouterLink>
  </div>
</template>

<style scoped lang="scss">

$column-full-span: span 9;
.grid-container {
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
    background-color: rgb(77, 77, 77);
    height: 100%;
    user-select: none;
  }

  &__filters {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 60px;
    background-color: rgb(77, 77, 77);
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
  background-color: rgb(43, 42, 42);
  text-align: center;
}

.wrapper {
  display: contents;
}

.wrapper:hover > div {
  background-color: rgb(49, 49, 49);
}

.info {
  font-size:24px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 24px auto;
}

// .projects-list {
//   list-style-type: none;
// }

// .projects-table {
//   border-spacing: 0px;
//   width: 100%;

// }

// th {
//   background-color: rgb(77, 77, 77);
//   height: 36px;

// }

// td {
//   text-align: center;
//   height: 48px;
//   background-color: rgb(43, 42, 42);
// }

// tr:hover td {
//   background-color: rgb(68, 68, 68);
// }

// .project-title {
//   display: flex;
// }

.clickable {
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}

.filteredBy {
  color: #fff;
  font-weight: bold;
}

.icon {
  margin-left: 5px;
}
</style>
