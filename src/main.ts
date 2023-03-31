import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowDownShortWide,
  faArrowUpWideShort,
  faFilter,
  faPenToSquare,
  faTrash,
  faXmark,
  faPaperPlane,
  faCirclePlus,
  faCircleCheck,
  faBoxArchive,
  faClock,
  faEarthEurope
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/main.scss'
import i18n from './i18n'

const app = createApp(App)

const pinia = createPinia()
library.add(
  faPenToSquare,
  faTrash,
  faArrowUpWideShort,
  faCircleCheck,
  faPaperPlane,
  faCirclePlus,
  faArrowDownShortWide,
  faFilter,
  faXmark,
  faBoxArchive,
  faClock,
  faEarthEurope
)
app.use(i18n)
app.use(router).use(pinia).component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
