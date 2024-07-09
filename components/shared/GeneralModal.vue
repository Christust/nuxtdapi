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
<script setup>

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
const generalModal = ref(null)
let modalInstance = null

const modalSize = computed(() => {
  return props.size ? `modal-${props.size}` : ''
})

// eslint-disable-next-line no-unused-vars
const toggle = () => {
  if (modalInstance) {
    modalInstance.toggle()
  }
}

// eslint-disable-next-line no-unused-vars
const show = () => {
  if (modalInstance) {
    modalInstance.show()
  }
}

const hide = () => {
  if (modalInstance) {
    modalInstance.hide()
  }
}

onMounted(() => {
  import('bootstrap').then((bootstrap) => {
    modalInstance = new bootstrap.Modal(generalModal.value)
    modalInstance._config.backdrop = !noCloseOnBackdrop.value
    modalInstance._config.keyboard = !noCloseOnEsc.value

    generalModal.value.addEventListener('shown.bs.modal', handleModalShown)
  })


})

const emit = defineEmits(['shown'])

const handleModalShown = () => {
  emit('shown')
}

defineExpose({
  show,
  hide
})
</script>
