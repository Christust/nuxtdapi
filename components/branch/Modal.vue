<script setup>
import branchService from '~/api/factories/branch';

// Props
const props = defineProps({
    branchData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' }
})
const { branchData } = toRefs(props)

// Emits
const emit = defineEmits(['reloadBranchs'])

// Refs
const branchFormRef = ref(null)
const branchModalRef = ref(null)

// Functions
function showModal() {
    branchModalRef.value.show()
}
function hideModal() {
    branchModalRef.value.hide()
}
function onShown() {
    branchFormRef.value.onShown()
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
    branchService.create(payload).then((res) => {
        emit("reloadBranchs")
        hideModal()
    })
}
function update(id, payload) {
    branchService.update(id, payload).then((res) => {
        emit("reloadBranchs")
        hideModal()
    })
}
function destroy(id) {
    branchService.destroy(id).then((res) => {
        emit("reloadBranchs")
        hideModal()
    })
}

// Computed
const modalTitle = computed(() => {
    switch (props.action) {
        case "create":
            return 'Crear nueva sucursal'
        case "update":
            return 'Editar sucursal'
        case "destroy":
            return 'Eliminar sucursal'
    }
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
    <SharedGeneralModal ref="branchModalRef" @shown="onShown" :title="modalTitle" size="md" modalContentClass="p-4"
        hideHeaderClose hideFooter noCloseOnEsc>
        <template #bodyContent>
            <BranchForm v-if="props.action !== 'destroy'" ref="branchFormRef" :branchData="branchData"
                :action="props.action" :btnActionLabel="btnActionLabel" @actionSubmit="actionSubmit"
                @cancelForm="hideModal" />
            <template v-else>
                <form @submit.prevent="destroy(branchData.id)">
                    <div class="row">
                        <div class="d-flex">
                            <h5>¿Esta seguro de eliminar esta sucursal?</h5>
                        </div>
                        <div class="row mx-0 px-0 justify-content-between align-branchs-center mt-3">
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
