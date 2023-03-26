127<script setup lang="ts">
import { useProjectStore } from '@/store/projects'
import { computed } from 'vue'
import { ProjectStatus } from '@/model'

const projectStore = useProjectStore()

const searchQuery = computed({
  get: () => projectStore.searchQuery,
  set: (value) => {
    projectStore.searchQuery = value
  }
})

const statusOptions = computed(() => [
  ProjectStatus.NEW,
  ProjectStatus.COMPLETED,
  ProjectStatus.DELIVERED
])

const selectedStatus = computed({
  get: () => projectStore.selectedStatus,
  set: (value) => {
    projectStore.selectedStatus = value
  }
})

function resetFilter() {
  projectStore.searchQuery = ''
}
</script>

<template>
  <div class="filters">
    <font-awesome-icon class="filters__icon" icon="fa-solid fa-filter" size="lg" />
    <input
      v-model="searchQuery"
      class="filters__input input"
      type="text"
      placeholder="Search name"
    />
    <font-awesome-icon
    v-if="projectStore.searchQuery"
      @click="resetFilter()"
      class="filters__icon delete"
      icon="fa-solid fa-xmark"
      size="lg"
    />
    <select name="status filter" id="filter" v-model="selectedStatus" class="filters__input input">
      <option value="null" disabled selected>Select status</option>
      <option value="">ALL</option>
      <option v-for="status in statusOptions" :value="status" :key="status">{{ status }}</option>
    </select>
  </div>
</template>

<style lang="scss">
.delete {
  position: absolute;
  right: 185px;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(136, 136, 136);
  cursor: pointer;
}

.filters {
  display: flex;
  background-color: rgb(77, 77, 77);
  width: 100%;
  justify-content: end;

  &__icon {
    align-self: center;
    margin-right: 15px;
  }

  &__input {
    margin-right: 25px;
  }
}
</style>
