<script setup>
import { useForm } from 'vee-validate'
import { object, string, setLocale, number } from 'yup'
import { es } from 'yup-locales'
import storeService from '~/api/factories/store';
import itemService from '~/api/factories/item';
setLocale(es)

// Props
const props = defineProps({
    stockData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' },
    btnActionLabel: { type: String, required: false, default: 'Guardar' }
})
const { action, btnActionLabel } = toRefs(props)

// Stores
const useLoader = useLoaderStore()

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
        store.value = props.stockData.store.id
        item.value = props.stockData.item.id
        amount.value = props.stockData.amount
    }
}
function listStores() {
    storeService.list().then((res) => {
        stores.value = res.data.stores
    })
}
function listItems({ search = "", loading = null }) {
    const payload = {
        search
    }
    itemService.list(payload).then((res) => {
        items.value = res.data.items
        if (loading) {
            setTimeout(() => {
                loading(false)
                useLoader.enableLoader()
            }, 700)
        }
    })
}
function onSearch(search, loading) {
    if (search.length) {
        useLoader.disableLoader()
        loading(true);
        listItems({ search, loading });
    }
}

// Hooks
onMounted(() => {
    listStores()
    listItems({})
})
defineExpose({
    onShown
})
</script>

<template>
    <form @submit.prevent="submit">
        <div class="row">
            <div class="col-12">
                <div class="mb-3">
                    <label for="store" class="form-label">Almacen</label>
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
                    <label for="item" class="form-label">Item</label>
                    <v-select label="name" v-model="item" :filterable="false" :options="items"
                        :reduce="(option) => option.id" @search="(search, loading) =>
                            onSearch(search, loading)
                            ">
                        <template slot="no-options"> Escribe para buscar... </template>
                        <template slot="option" slot-scope="option">
                            <div class="d-center">
                                {{ option.name }}
                            </div>
                        </template>
                        <template slot="selected-option" slot-scope="option">
                            <div class="selected d-center">
                                {{ option.name }}
                            </div>
                        </template>
                    </v-select>
                    <div class="invalid-feedback d-block" v-if="errors.item">
                        {{ errors.item }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="amount" class="form-label">Cantidad</label>
                    <input id="amount" type="number" class="form-control" v-model="amount">
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