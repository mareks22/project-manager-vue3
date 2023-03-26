<script setup lang="ts">
import type { Project } from '@/model'
import { computed } from 'vue'

interface Props {
  project: Project[]
  title: string
  keyObject: string
  valueObject: string
}

const props: Readonly<Props> = defineProps({
  title: {
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
      ? Object.keys(languageCounts).reduce((a, b) =>
          languageCounts[a] > languageCounts[b] ? a : b
        )
      : ''
  const result = ` ${prominentLanguage} - ${languageCounts[prominentLanguage]}`
  return result
})

const cardInfo = computed<{ stat: string; icon: string }>(() => {
  switch (props.title) {
    case 'New':
      return { stat: projectCounter.value.toString(), icon: 'fa-solid fa-circle-plus' }
    case 'Completed':
      return { stat: projectCounter.value.toString(), icon: 'fa-solid fa-circle-check' }
    case 'Delivered':
      return { stat: projectCounter.value.toString(), icon: 'fa-solid fa-paper-plane' }
    case 'Overdue':
      return { stat: numberOfOverdueProjects.value.toString(), icon: 'fa-solid fa-clock' }
    case 'Prominent':
      return { stat: languageCounter.value, icon: 'fa-solid fa-box-archive' }
    default:
      return { stat: '', icon: '' }
  }
})
</script>

<template>
  <div class="stat-card">
    <div class="text">
      <span class="stat-card__value">{{ cardInfo.stat }}</span>
      <h2 class="stat-card__title">{{ props.title }}</h2>
    </div>
    <font-awesome-icon class="icon" :icon="cardInfo.icon" size="2xl" />
  </div>
</template>

<style scoped lang="scss">
.stat-card {
  background-color: #fff;
  width: 100%;
  height: 100px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  min-width: 190px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;

  &__title {
    font-size: 1rem;
    align-self: center;
    line-height: 1rem;
    padding-top: 10px;
  }

  &__value {
    font-size: 2.25rem;
    line-height: 2rem;
  }
}
.icon {
  margin: 20px;
  align-self: center;
}
.text {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
</style>
