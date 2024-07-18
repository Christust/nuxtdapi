<script setup>

// Props
const props = defineProps({
  title: { type: String, required: false, default: 'Modal title' },
  size: { type: String, required: false, default: 'sm' },
  modalContentClass: { type: String, required: false, default: '' },
  hideHeaderClose: { type: Boolean, required: false, default: false },
  noCloseOnBackdrop: { type: Boolean, required: false, default: false },
  noCloseOnEsc: { type: Boolean, required: false, default: false },
  hideFooter: { type: Boolean, required: false, default: false },
  hideHeader: { type: Boolean, required: false, default: false }
})
const { title, hideHeaderClose, noCloseOnBackdrop, noCloseOnEsc, modalContentClass, hideFooter } =
  toRefs(props)

// Emits
const emit = defineEmits(['shown'])

// Refs
const generalModal = ref(null)

// Contants
let modalInstance = null

// Functions
function toggle() {
  if (modalInstance) {
    modalInstance.toggle()
  }
}
function show() {
  if (modalInstance) {
    modalInstance.show()
  }
}
function hide() {
  if (modalInstance) {
    modalInstance.hide()
  }
}
function handleModalShown() {
  emit('shown')
}

// Computed
const modalSize = computed(() => {
  return props.size ? `modal-${props.size}` : ''
})

// Hooks
onMounted(() => {
  import('bootstrap').then((bootstrap) => {
    modalInstance = new bootstrap.Modal(generalModal.value)
    modalInstance._config.backdrop = !noCloseOnBackdrop.value
    modalInstance._config.keyboard = !noCloseOnEsc.value
    generalModal.value.addEventListener('shown.bs.modal', handleModalShown)
  })
})
defineExpose({
  show,
  hide
})
</script>
<template>
  <ClientOnly>
    <div class="modal fade" ref="generalModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" :class="modalSize">
        <div class="modal-content" :class="modalContentClass">
          <div class="modal-header border-bottom-0" v-if="!hideHeader">
            <h5 class="modal-title text-primary-app" id="exampleModalLabel">{{ title }}</h5>
            <button v-if="!hideHeaderClose" type="button" class="btn-close" @click="hide()" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot name="bodyContent">...</slot>
          </div>
          <div v-if="!hideFooter" class="modal-footer border-top-0">
            <slot name="footerContent">
              <button type="button" class="btn btn-secondary" @click="hide()">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
