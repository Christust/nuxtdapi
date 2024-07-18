<script setup>
import storeService from '~/api/factories/store';
// Props
const props = defineProps({
    storeData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' }
})
const { storeData } = toRefs(props)

// Refs
const storeFormRef = ref(null)
const storeModalRef = ref(null)

// Emits
const emit = defineEmits(['reloadStores'])

// Functions
const showModal = () => {
    storeModalRef.value.show()
}
const hideModal = () => {
    storeModalRef.value.hide()
}
function onShown() {
    storeFormRef.value.onShown()
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
    storeService.create(payload).then((res) => {
        emit("reloadStores")
        hideModal()
    })
}
function update(id, payload) {
    storeService.update(id, payload).then((res) => {
        emit("reloadStores")
        hideModal()
    })
}
function destroy(id) {
    storeService.destroy(id).then((res) => {
        emit("reloadStores")
        hideModal()
    })
}

// Computed
const modalTitle = computed(() => {
    switch (props.action) {
        case "create":
            return 'Crear nuevo almacen'
        case "update":
            return 'Editar almacen'
        case "destroy":
            return 'Eliminar almacen'
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
    <SharedGeneralModal ref="storeModalRef" @shown="onShown" :title="modalTitle" size="md" modalContentClass="p-4"
        hideHeaderClose hideFooter noCloseOnEsc>
        <template #bodyContent>
            <StoreForm v-if="props.action !== 'destroy'" ref="storeFormRef" :storeData="storeData" :action="props.action"
                :btnActionLabel="btnActionLabel" @actionSubmit="actionSubmit" @cancelForm="hideModal" />
            <template v-else>
                <form @submit.prevent="destroy(storeData.id)">
                    <div class="row">
                        <div class="d-flex">
                            <h5>¿Esta seguro de eliminar este almacen?</h5>
                        </div>
                        <div class="row mx-0 px-0 justify-content-between align-stores-center mt-3">
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
