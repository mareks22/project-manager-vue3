<script setup lang="ts">
import type { Project } from '@/model';
import { defineProps, computed } from 'vue';

interface Props {
    project: Project[];
    title: string;
    color: string;
    keyObject: string,
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
      type:  Object as () => Project[],
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
  });

  const numberOfOverdueProjects = computed(() => {
      return props.project.filter(project => {
        const dueDate = new Date(project[props.keyObject]);
        console.log(dueDate)
        return dueDate < new Date();
      }).length;}
  )

  function projectCounter(): number {
    if(!props.keyObject) return 0
    return props.project.filter(project => project[props.keyObject] === props.valueObject).length
  }

</script>

<template>
  <div class="stat-card" :style="{ 'background-color': props.color }">
    <h2 class="stat-card__title"> {{ props.title }}</h2>
    <span class="stat-card__value">{{numberOfOverdueProjects}}</span>
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
