<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n';

//clock functionality
const currentHour = ref<Date>(new Date())
const intervalID = ref()
function getCurrentHour() {
  currentHour.value = new Date()
}
function startClock() {
  setInterval(getCurrentHour, 1000)
}
onMounted(() => {
  startClock()
})
onUnmounted(() => {
  clearInterval(intervalID.value)
})

let { locale } = useI18n({ useScope: 'global' })

const colorOptions = ['EN', 'IT']
const showSelect = ref(false)
const onLanguage = (option: string) => {

    locale.value = option.toLowerCase()
  showSelect.value = false
}
</script>

<template>
  <div class="top-bar">
    <span class="top-bar__clock">{{ currentHour.toLocaleTimeString() }}</span>
    <h2>{{$t('appTitle')}}</h2>
    <div class="top-bar__localization" @click="showSelect = !showSelect">
      <span class="top-bar__lang">EN</span>
      <font-awesome-icon class="top-bar__icon" icon="fa-solid fa-earth-europe" size="xl" />
      
    </div>
    <ul v-if="showSelect" class="options">
        <li @click="onLanguage(option)" v-for="(option, index) in colorOptions" :key="index">{{ option }}</li>
      </ul>
  </div>
</template>
<style scoped lang="scss">
.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 2.5rem;
  align-items: center;

  &__icon {
  }
  &__clock {
    padding: 0 2rem;
    font-weight: 500;
  }
  &__lang {
    padding-right: 0.5rem;
    font-weight: 500;
  }
  &__localization {
    margin-right: 2rem;
    cursor: pointer;
    padding: 0.25rem;
    box-sizing: border-box;
    position: relative;
    user-select: none;
    &:hover {
      border: 1px solid rgb(0, 0, 61);
      border-radius: 3px;
    }
  }
}

.options {
    padding-inline-start: 0;
     background: #fff;
    // color: #fff;
    position: absolute;
    top: 100%;
    right: 5%;
  list-style-type: none;
  border-radius: 5px;
  font-weight: 500;
  z-index: 5;
  //border: 1px solid #262626;
  box-shadow:  0 2px 12px 0 rgba(0, 0, 0, 0.1);
  
  li {
    text-align: center;
    padding:0.5rem 1.5rem;
    user-select: none;
    &:hover {
        background-color: #ebebeb;
    }
  }
}
</style>
