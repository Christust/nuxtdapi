<script setup>
import materialRequestService from '~/api/factories/material_request';
// Props
const props = defineProps({
    materialRequestData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' }
})
const { materialRequestData } = toRefs(props)

// Refs
const materialRequestFormRef = ref(null)
const materialRequestModalRef = ref(null)

// Emits
const emit = defineEmits(['reloadMaterialRequests'])

// Functions
const showModal = () => {
    materialRequestModalRef.value.show()
}
const hideModal = () => {
    materialRequestModalRef.value.hide()
}
function onShown() {
    materialRequestFormRef.value.onShown()
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
    materialRequestService.create(payload).then((res) => {
        emit("reloadMaterialRequests")
        hideModal()
    })
}
function update(id, payload) {
    materialRequestService.update(id, payload).then((res) => {
        emit("reloadMaterialRequests")
        hideModal()
    })
}
function destroy(id) {
    materialRequestService.destroy(id).then((res) => {
        emit("reloadMaterialRequests")
        hideModal()
    })
}

// Computed
const modalTitle = computed(() => {
    return props.action === 'create' ? 'Crear nuevo petición de material' : 'Editar petición de material'
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
    <SharedGeneralModal ref="materialRequestModalRef" @shown="onShown" :title="modalTitle" size="md" modalContentClass="p-4"
        hideHeaderClose hideFooter noCloseOnEsc>
        <template #bodyContent>
            <MaterialRequestForm v-if="props.action !== 'destroy'" ref="materialRequestFormRef" :materialRequestData="materialRequestData"
                :action="props.action" :btnActionLabel="btnActionLabel" @actionSubmit="actionSubmit"
                @cancelForm="hideModal" />
            <template v-else>
                <form @submit.prevent="destroy(materialRequestData.id)">
                    <div class="row">
                        <div class="d-flex">
                            <h5>¿Esta seguro de eliminar esta petición de material?</h5>
                        </div>
                        <div class="row mx-0 px-0 justify-content-between align-materialRequests-center mt-3">
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
