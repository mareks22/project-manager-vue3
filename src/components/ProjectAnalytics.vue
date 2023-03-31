<script setup lang="ts">
import ProjectStat from './ProjectStat.vue'
import { useProjectStore } from '@/store/projects'
import { storeToRefs } from 'pinia'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const stats = [
  {
    keyObject: 'status',
    valueObject: 'NEW',
    title: 'New'
  },
  {
    keyObject: 'status',
    valueObject: 'COMPLETED',
    title: 'Completed'
  },
  {
    keyObject: 'status',
    valueObject: 'DELIVERED',
    title: 'Delivered'
  },
  {
    keyObject: 'dateDue',
    title: 'Overdue'
  },
  {
    keyObject: 'sourceLanguage',
    title: 'Prominent'
  }
]
</script>

<template>
  <div class="analytics">
    <div v-for="(stat, index) in stats" :key="index" class="analytics-group">
      <ProjectStat
        class="analytics-group__card"
        :project="projects"
        :keyObject="stat.keyObject"
        :valueObject="stat.valueObject"
        :title="stat.title"
      >
      </ProjectStat>
    </div>
  </div>
</template>

<style lang="scss">
$border-radius: 10px;

.analytics {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
padding: 2rem;
  &-group {
    display: flex;

    &__card {
      margin-bottom: 24px;
      &:first-child {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
      }
      &:last-child {
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
  }
}
</style>
