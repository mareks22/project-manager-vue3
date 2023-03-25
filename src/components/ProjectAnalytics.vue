<template>
  <div class="analytics">
    <div v-for="(stat, index) in stats" :key="index" class="analytics-group">
    <ProjectStat
      class="analytics-group__card"
      :project="projects"
      :keyObject="stat.keyObject"
      :valueObject="stat.valueObject"
      :title="stat.title"
      :color="stat.color"
    >
    </ProjectStat>
  </div>
    <!-- <div class="analytics-group" >
      <ProjectStat
        class="analytics-group__card"
        :project="projects"
        :keyObject="'status'"
        :valueObject="'NEW'"
        title="New"
        color="#333333"
      >
      </ProjectStat>
      <ProjectStat
        class="analytics-group__card"
        :project="projects"
        :keyObject="'status'"
        :valueObject="'COMPLETED'"
        title="Completed"
        color="#197BBD"
      >
      </ProjectStat>
      <ProjectStat
        class="analytics-group__card"
        :project="projects"
        :keyObject="'status'"
        :valueObject="'DELIVERED'"
        title="Delivered"
        color="#345511"
      >
      </ProjectStat>
    </div>
    <div class="analytics-group">
      <ProjectStat
        class="analytics-group__card"
        :project="projects"
        title="Overdue"
        :keyObject="'dateDue'"
        color="#BC412B"
      >
      </ProjectStat>
    </div>
    <div class="analytics-group">
      <ProjectStat
        class="analytics-group__card"
        :project="projects"
        title="Prominent"
        :keyObject="'sourceLanguage'"
        color="#274156"
      >
      </ProjectStat>
    </div> -->
  </div>
</template>

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
          title: 'New',
          color: '#333333',
        },
        {
          keyObject: 'status',
          valueObject: 'COMPLETED',
          title: 'Completed',
          color: '#197BBD',
        },
        {
          keyObject: 'status',
          valueObject: 'DELIVERED',
          title: 'Delivered',
          color: '#345511',
        },
        {
          keyObject: 'dateDue',
          title: 'Overdue',
          color: '#BC412B',
        },
        {
          keyObject: 'sourceLanguage',
          title: 'Prominent',
          color: '#274156',
        },
      ]

</script>

<style lang="scss">
$border-radius: 10px;

.analytics {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-bottom: 24px;

  &-group {
    display: flex;

    &__card {
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
