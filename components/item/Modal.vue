<script setup>
import itemService from '~/api/factories/item';
// Props
const props = defineProps({
    itemData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' }
})
const { itemData } = toRefs(props)

// Refs
const itemFormRef = ref(null)
const itemModalRef = ref(null)

// Emits
const emit = defineEmits(['reloadItems'])

// Functions
const showModal = () => {
    itemModalRef.value.show()
}
const hideModal = () => {
    itemModalRef.value.hide()
}
function onShown() {
    itemFormRef.value.onShown()
}
function actionSubmit(data, id = null) {
    switch (props.action) {
        case "create":
            create(data)
            break;
        case "update":
            update(id, data)
            break;
        default:
            break;
    }
}
function create(payload) {
    itemService.create(payload).then((res) => {
        emit("reloadItems")
        hideModal()
    })
}
function update(id, payload) {
    itemService.update(id, payload).then((res) => {
        emit("reloadItems")
        hideModal()
    })
}
function destroy(id) {
    itemService.destroy(id).then((res) => {
        emit("reloadItems")
        hideModal()
    })
}

// Computed
const modalTitle = computed(() => {
    return props.action === 'create' ? 'Crear nuevo item' : 'Editar item'
})
const btnActionLabel = computed(() => {
    return props.action === 'create' ? 'Crear' : 'Actualizar'
})

// Hooks
defineExpose({
    showModal,
    hideModal
})
</script>
<template>
    <SharedGeneralModal ref="itemModalRef" @shown="onShown" :title="modalTitle" size="md" modalContentClass="p-4"
        hideHeaderClose hideFooter noCloseOnEsc>
        <template #bodyContent>
            <ItemForm v-if="props.action !== 'destroy'" ref="itemFormRef" :itemData="itemData" :action="props.action"
                :btnActionLabel="btnActionLabel" @actionSubmit="actionSubmit" @cancelForm="hideModal" />
            <template v-else>
                <form @submit.prevent="destroy(itemData.id)">
                    <div class="row">
                        <div class="d-flex">
                            <h5>¿Esta seguro de eliminar este item?</h5>
                        </div>
                        <div class="row mx-0 px-0 justify-content-between align-items-center mt-3">
                            <div class="col-6">
                                <button type="button" class="btn btn-secondary w-100" @click="hideModal"
                                    data-bs-dismiss="modal">
                                    Cerrar
                                </button>
                            </div>
                            <div class="col-6">
                                <button type="submit" class="btn btn-danger w-100">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </template>
        </template>
    </SharedGeneralModal>
</template>
