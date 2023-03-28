<template>
  <div class="modal" v-if="showModal" >
    <div class="modal-overlay" @click.self="onCancel"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3>{{ props.title }}</h3>
      </div>
      <div class="modal-body">
        <p>{{ props.message }}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="onCancel">Cancel</button>
        <button class="btn btn-primary" @click="onConfirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

interface Props {
  title: string
  message: string
  modalProps: string | number | boolean
}

const props: Readonly<Props> = defineProps({
  title: {
    type: String,
    default: 'Confirmation'
  },
  modalProps: {
    default: ''
  },
  message: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['confirm', 'cancel'])

const showModal = ref(true)

const onConfirm = () => {
  emits('confirm', props.modalProps)
  showModal.value = false
}

const onCancel = () => {
    console.log('clicked')
  emits('cancel')
  showModal.value = false
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal-container {
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.modal-header {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  margin-left: 10px;
}
</style>
