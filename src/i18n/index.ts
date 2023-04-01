import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    appTitle: 'Project List App',
    addProject: 'Add Project',
    edit: 'Edit',
    back: 'Back',
    confirm: 'Confirm',
    cancel: 'Cancel',
    sureToDelete: 'Are you sure you want to delete: {name}',

    id: 'ID',
    name: 'Name',
    status: 'Status',
    sourceLanguage: 'Source Language',
    targetLanguage: 'Target Languages',
    dateDue: 'Due Date',
    dateCreated: 'Created',
    searchName: 'Search name',
    all: 'All',
    commaSeparated: '(comma separated)',

    NEW: 'New',
    COMPLETED: 'Completed',
    DELIVERED: 'Delivered',

    noProjects: 'No projects found.'
  },

  it: {
    appTitle: 'App Lista Progetti',
    addProject: 'Aggiungi Progetto',
    edit: 'Modifica',
    back: 'Indietro',
    confirm: 'Conferma',
    cancel: 'Cancella',
    sureToDelete: 'Sei sicuro di voler cancellare: {name}',


    id: 'ID',
    name: 'Nome',
    status: 'Stato',
    sourceLanguage: "Lingua d'origine",
    targetLanguage: 'Lingue finali',
    dateDue: 'Scadenza',
    dateCreated: 'Creato',
    searchName: 'Cerca nome',
    all: 'Tutto',
    commaSeparated: '(separati da virgola)',

    NEW: 'Nuovo',
    COMPLETED: 'Completato',
    DELIVERED: 'Spedito',

    noProjects: 'Nessun progetto trovato.'
  }
}

const i18n = createI18n({
  // default locale
  legacy: false,
  locale: 'en',

  // translations

  messages
})

export default i18n
