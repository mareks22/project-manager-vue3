import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // default locale
  legacy: false,
  locale: 'en',

  // translations

  messages: {
    en: {
      appTitle: 'Project List App',
      addProject: 'Add Project',

      id: 'ID',
      name: 'Name',
      status: 'Status',
      sourceLanguage: 'Source Language',
      targetLanguage: 'Target Language',
      dateDue: 'Due Date',
      dateCreated: 'Created',
      searchName: 'Search name',
      all: 'All'
    },

    it: {
      appTitle: 'App Lista Progetti',
      addProject: 'Aggiungi Progetto',

      id: 'ID',
      name: 'Nome',
      status: 'Stato',
      sourceLanguage: "Lingua d'origine",
      targetLanguage: 'Lingua finale',
      dateDue: 'Scadenza',
      dateCreated: 'Creato',
      searchName: 'Cerca nome',
      all: 'Tutto'
    }
  }
})

export default i18n
