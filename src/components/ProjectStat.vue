<script setup lang="ts">
import type { Project } from '@/model'
import { computed } from 'vue'

interface Props {
  project: Project[]
  title: string
  color: string
  keyObject: string
  valueObject: string
}

const props: Readonly<Props> = defineProps({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  project: {
    type: Object as () => Project[],
    required: true
  },
  keyObject: {
    type: String,
    default: null
  },
  valueObject: {
    type: String,
    default: ''
  }
})

const numberOfOverdueProjects = computed(() => {
  return props.project.filter((project) => {
    const dueDate = new Date(project[props.keyObject])
    return dueDate < new Date()
  }).length
})

const projectCounter = computed(() => {
  return props.project.filter((project) => project[props.keyObject] === props.valueObject).length
})

const languageCounter = computed(() => {
  const languageCounts: { [key: string]: number } = {}
props.project.forEach((project) => {
  const language = project[props.keyObject]
  if (languageCounts[language]) {
    languageCounts[language]++
  } else {
    languageCounts[language] = 1
  }
})
const prominentLanguage =
  Object.keys(languageCounts).length > 0
    ? Object.keys(languageCounts).reduce(
        (a, b) => (languageCounts[a] > languageCounts[b] ? a : b)
      )
    : ''
    const result = `${languageCounts[prominentLanguage]} - ${prominentLanguage}`
  return result
})


const statToShow = computed(() => {
  switch(props.title){
    case 'New' :
      return projectCounter
    case 'Completed':
      return projectCounter
    case 'Delivered':
      return projectCounter
    case 'Overdue':
      return numberOfOverdueProjects
    case 'Prominent':
      return languageCounter.value
    default :
      return 0
  }
})
</script>

<template>
  <div class="stat-card" :style="{ 'background-color': props.color }">
    <h2 class="stat-card__title">{{ props.title }}</h2>
    <span class="stat-card__value">{{ statToShow }}</span>
  </div>
</template>

<style scoped lang="scss">
.stat-card {
  background-color: blueviolet;
  width: 100%;
  height: 120px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 190px;

  &__title {
    margin-left: 12px;
  }

  &__value {
    margin-left: 12px;
    font-size: 2.5rem;
  }
}
</style>
