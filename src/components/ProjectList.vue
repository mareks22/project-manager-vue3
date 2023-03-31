<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { supabase } from '../lib/supabase'

import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/store/projects'
import { useRouter } from 'vue-router'
import ConfirmModal from './ui/ConfirmModal.vue'
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

const fetchData = async () => {
  await getProjects()
  sortProjectsByNumber('id', reverseSort.value)
}

onMounted(() => {
  fetchData()
})

const filterIcon = computed<string>(() =>
  reverseSort.value ? 'fa-solid fa-arrow-up-wide-short' : 'fa-solid fa-arrow-down-short-wide'
)

function onEdit(id: string | number) {
  router.push(`/add-project/${id}`)
}

function onSort(filterBy: string) {
  isFiltered.value = filterBy
  reverseSort.value = !reverseSort.value

  sortProjectsByString(filterBy, reverseSort.value)

  // switch (filterBy) {
  //   case 'Name':
  //     sortProjectsByString('name', reverseSort.value)
  //     break
  //   case 'ID':
  //     sortProjectsByNumber('id', reverseSort.value)
  //     break
  //   case 'Status':
  //     sortProjectsByString('status', reverseSort.value)
  //     break
  //   case 'Due Date':
  //     sortProjectsByDate('dateDue', reverseSort.value)
  //     break
  //   case 'Source Language':
  //     sortProjectsByString('sourceLanguage', reverseSort.value)
  //     break
  //   case 'Created':
  //     sortProjectsByDate('dateCreated', reverseSort.value)
  //     break
  // }
}

const titleArray = [
  'id',
  'name',
  'status',
  'sourceLanguage',
  'targetLanguage',
  'dateDue',
  'dateCreated',
  '',
  ''
]
const fullSpan = computed(() => {
  return `grid-column: span ${titleArray.length}`
})

//modal handling
const showModal = ref(false)
const message = ref(`Are you sure you want to delete: `)
const modalProps = ref('')

const onDelete = (name: string, id: string) => {
  showModal.value = true
  message.value = message.value + name
  modalProps.value = id
}

const onConfirm = (id: number) => {
  removeProject(id)
}

const onCancel = () => {
  showModal.value = false
}
</script>

<template>
  <div class="grid-wrapper">
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
        <span class="clickable">{{ $t(title) }}</span>
        <font-awesome-icon
          v-if="isFiltered === title && title.length > 0"
          class="clickable icon"
          :icon="filterIcon"
        />
      </div>

      <div v-for="project in filteredProjects" :key="project.id" class="wrapper">
        <div class="grid-container__item">{{ project.id }}</div>
        <div class="grid-container__item">{{ project.name }}</div>
        <div class="grid-container__item">
          <span :class="['grid-container__item-status', project.status.toLowerCase()]">
            {{ project.status }}</span
          >
        </div>
        <div class="grid-container__item">{{ project.sourceLanguage }}</div>
        <div class="grid-container__item">{{ project.targetLanguages.join(', ') }}</div>
        <div class="grid-container__item">{{ new Date(project.dateDue).toLocaleDateString() }}</div>
        <div class="grid-container__item">
          {{ new Date(project.dateCreated).toLocaleDateString() }}
        </div>
        <div class="grid-container__item">
          <font-awesome-icon
            @click="onEdit(project.id)"
            class="clickable"
            icon="fa-solid fa-pen-to-square"
          />
        </div>
        <div class="grid-container__item">
          <font-awesome-icon
            @click="onDelete(project.name, project.id.toString())"
            class="clickable"
            icon="fa-solid fa-trash"
          />
        </div>
      </div>

      <div :style="fullSpan" v-if="filteredProjects.length == 0" class="info">
        No projects found.
      </div>
    </div>
  </div>
  <div class="footer">
    <RouterLink to="/add-project"
      ><button class="btn btn-primary">{{ $t('addProject') }}</button></RouterLink
    >
  </div>
  <ConfirmModal
    v-if="showModal"
    :message="message"
    :modalProps="modalProps"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<style scoped lang="scss">
$column-full-span: span 9;
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid-container {
  $header-bg-color: rgb(241, 241, 241);
  display: grid;
  grid-template-columns: minmax(75px, auto) repeat(6, 1fr) minmax(50px, auto) minmax(50px, auto);
  grid-auto-rows: minmax(40px, auto);
  gap: 0;
  align-items: center;
  justify-items: end;
  min-width: 1024px;
  width: 100%;

  &__header {
    width: 100%;
    height: 100%;
    @include flex-center;
    background-color: $header-bg-color;
  }

  &__filters {
    display: flex;
    justify-content: flex-end;
    height: 60px;
    background-color: $header-bg-color;
  }

  &__item {
    @include flex-center;
    font-weight: 500;
    width: 100%;
    height: 48px;
    background-color: #fff;
    text-align: center;
    &-status {
      padding: 5px 30px;
      border-radius: 12px;
      font-weight: 600;
      &.new {
        background-color: #fcee32;
      }
      &.delivered {
        background-color: #8a4dfc;
        color: #fff;
      }
      &.completed {
        background-color: #03eab3;
      }
    }
  }
}

.footer {
  display: flex;
  width: 100%;
  justify-content: end;
  padding: 0 2rem;
}

.wrapper {
  display: contents;
}

.grid-wrapper {
  width: 100%;
  overflow-x: auto;
  padding: 2rem;
}

.grid-wrapper::-webkit-scrollbar {
  width: 4px;
  color: #3a3a3a;
  &-track {
    border-radius: 8px;
    background-color: #e7e7e7;
    border: 1px solid #cacaca;
  }
  &-thumb {
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: content-box;
    background-color: #b9b9b9;
  }
}

.wrapper:hover > div {
  background-color: #f5f5f5;
}

.info {
  font-size: 24px;
  text-align: center;
  @include flex-center;
  margin: 24px auto;
}
.clickable {
  font-weight: 600;
  user-select: none;
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
