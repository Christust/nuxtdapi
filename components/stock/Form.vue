<script setup>
import { useForm } from 'vee-validate'
import { object, string, setLocale, number } from 'yup'
import { es } from 'yup-locales'
import storeService from '~/api/factories/store';
import itemService from '~/api/factories/item';
import branchService from '~/api/factories/branch';
setLocale(es)

// Props
const props = defineProps({
    stockData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' },
    btnActionLabel: { type: String, required: false, default: 'Guardar' }
})
const { action, btnActionLabel } = toRefs(props)

// Emits
const emit = defineEmits(['actionSubmit', 'hideModal'])

// Stores
const useLoader = useLoaderStore()

// Form schema
const getValidationSchema = computed(() => {
    const schema = {
        branch: string().required("La sucursal es requerida"),
        store: string().required("El almacen es requerido"),
        item: string().required("El item es requerido"),
        amount: number().typeError('La cantidad debe ser un numero').required("La cantidad es requerida"),
    }
    return object(schema)
})
const validationSchema = getValidationSchema
const { defineField, errors, handleSubmit, meta } = useForm({
    validationSchema
});

// Refs
const [store] = defineField('store')
const [branch] = defineField('branch')
const [item] = defineField('item')
const [amount] = defineField('amount')
const stores = ref([])
const items = ref([])
const branches = ref([])

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
        branch.value = ""
        store.value = ""
        item.value = ""
        amount.value = ""
    }
    if (action.value !== 'create' && props.stockData) {
        branch.value = props.stockData.store.branch.id
        store.value = props.stockData.store.id
        item.value = props.stockData.item.id
        amount.value = props.stockData.amount
    }
}
function listBranches({ search = "", loading = null }) {
    const payload = {
        search
    }
    branchService.list(payload).then((res) => {
        branches.value = res.data.branches
        if (loading) {
            setTimeout(() => {
                loading(false)
                useLoader.enableLoader()
            }, 700)
        }
    })
}
function listStores({ search = "", loading = null }) {
    store.value = null
    const payload = {
        search,
        branch_id: branch.value
    }
    storeService.list(payload).then((res) => {
        stores.value = res.data.stores
        if (loading) {
            setTimeout(() => {
                loading(false)
                useLoader.enableLoader()
            }, 700)
        }
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
function onSearchItems(search, loading) {
    if (search.length) {
        useLoader.disableLoader()
        loading(true);
        listItems({ search, loading });
    }
}
function onSearchStores(search, loading) {
    if (search.length) {
        useLoader.disableLoader()
        loading(true);
        listStores({ search, loading });
    }
}
function onSearchBranches(search, loading) {
    if (search.length) {
        useLoader.disableLoader()
        loading(true);
        listBranches({ search, loading });
    }
}

// Hooks
onMounted(() => {
    listBranches({})
    listStores({})
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
                    <label for="store" class="form-label">Sucursal</label>
                    <v-select @option:selected="listStores({})" label="name" v-model="branch" :filterable="false"
                        :options="branches" :reduce="(option) => option.id" @search="(search, loading) =>
                            onSearchBranches(search, loading)
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
                    <div class="invalid-feedback d-block" v-if="errors.branch">
                        {{ errors.branch }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="store" class="form-label">Almacen</label>
                    <v-select :disabled="!branch" label="name" v-model="store" :filterable="false" :options="stores"
                        :reduce="(option) => option.id" @search="(search, loading) =>
                            onSearchStores(search, loading)
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
                            onSearchItems(search, loading)
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
                    <input @keypress="useNumber($event)" id="amount" type="number" class="form-control" v-model="amount">
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