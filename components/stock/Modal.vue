<script setup>
import stockService from '~/api/factories/stock';
// Props
const props = defineProps({
    stockData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' }
})
const { stockData } = toRefs(props)

// Refs
const stockFormRef = ref(null)
const stockModalRef = ref(null)

// Emits
const emit = defineEmits(['reloadStocks'])

// Functions
const showModal = () => {
    stockModalRef.value.show()
}
const hideModal = () => {
    stockModalRef.value.hide()
}
function onShown() {
    stockFormRef.value.onShown()
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
    stockService.create(payload).then((res) => {
        emit("reloadStocks")
        hideModal()
    })
}
function update(id, payload) {
    stockService.update(id, payload).then((res) => {
        emit("reloadStocks")
        hideModal()
    })
}
function destroy(id) {
    stockService.destroy(id).then((res) => {
        emit("reloadStocks")
        hideModal()
    })
}

// Computed
const modalTitle = computed(() => {
    return props.action === 'create' ? 'Crear nuevo stock' : 'Editar stock'
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
    <SharedGeneralModal ref="stockModalRef" @shown="onShown" :title="modalTitle" size="md" modalContentClass="p-4"
        hideHeaderClose hideFooter noCloseOnEsc>
        <template #bodyContent>
            <StockForm v-if="props.action !== 'destroy'" ref="stockFormRef" :stockData="stockData" :action="props.action"
                :btnActionLabel="btnActionLabel" @actionSubmit="actionSubmit" @cancelForm="hideModal" />
            <template v-else>
                <form @submit.prevent="destroy(stockData.id)">
                    <div class="row">
                        <div class="d-flex">
                            <h5>¿Esta seguro de eliminar este stock?</h5>
                        </div>
                        <div class="row mx-0 px-0 justify-content-between align-stocks-center mt-3">
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
