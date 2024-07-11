<script setup>
import { useForm } from 'vee-validate'
import { object, string, setLocale, number } from 'yup'
import { es } from 'yup-locales'
setLocale(es)

// Props
const props = defineProps({
    stockData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' },
    btnActionLabel: { type: String, required: false, default: 'Guardar' }
})
const { action, btnActionLabel } = toRefs(props)

// Form schema
const getValidationSchema = computed(() => {
    const schema = {
        store: string().required("El nombre es requerido"),
        item: string().required("La descripción es requerida"),
        amount: number().required("La marca es requerida"),
    }
    return object(schema)
})
const validationSchema = getValidationSchema
const { defineField, errors, handleSubmit, meta } = useForm({
    validationSchema
});

// Refs
const [store] = defineField('store')
const [item] = defineField('item')
const [amount] = defineField('amount')
const stores = ref([])
const items = ref([])

// Emits
const emit = defineEmits(['actionSubmit', 'hideModal'])

// Functions
const submit = handleSubmit(() => {
    emit('actionSubmit', generatePayload(), props.stockData?.id || null)
})
function generatePayload() {
    const formData = new FormData()
    formData.append('store', store.value)
    formData.append('item', item.value)
    formData.append('amount', amount.value)
    return formData
}
function onShown() {
    if (action.value === 'create') {
        store.value = ""
        item.value = ""
        amount.value = ""
    }
    if (action.value !== 'create' && props.stockData) {
        store.value = props.stockData.store
        item.value = props.stockData.item
        amount.value = props.stockData.amount
    }
}
function listStores() {
    branchService.list().then((res) => {
        branches.value = res.data.branches
    })
}
function listItems() {
    branchService.list().then((res) => {
        branches.value = res.data.branches
    })
}

// Hooks
defineExpose({
    onShown
})
</script>

<template>
    <form @submit.prevent="submit">
        <div class="row">
            <div class="col-12">
                <div class="mb-3">
                    <label for="store" class="form-label">Nombre</label>
                    <select class="form-select" v-model="store">
                        <option v-for="storeItem in stores" :key="storeItem.id + storeItem.name + 'STORE'"
                            :value="storeItem.id" v-text="storeItem.name"></option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors.store">
                        {{ errors.store }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="item" class="form-label">Descripción</label>
                    <select class="form-select" v-model="item">
                        <option v-for="itemElement in items" :key="itemElement.id + itemElement.name + 'ITEM'"
                            :value="itemElement.id" v-text="itemElement.name"></option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors.item">
                        {{ errors.item }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="amount" class="form-label">Marca</label>
                    <input id="amount" type="text" class="form-control" v-model="amount">
                    <div class="invalid-feedback d-block" v-if="errors.amount">
                        {{ errors.amount }}
                    </div>
                </div>
            </div>
            <div class="row mx-0 px-0 justify-content-between align-stocks-center mt-3">
                <div class="col-6">
                    <button type="button" class="btn btn-secondary w-100" @click="emit('hideModal')"
                        data-bs-dismiss="modal">
                        Cerrar
                    </button>
                </div>
                <div class="col-6">
                    <button :disabled="!meta.valid" type="submit" class="btn btn-primary w-100">
                        {{ btnActionLabel }}
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>