<script setup>
import { useForm } from 'vee-validate'
import { object, string, boolean, setLocale, array } from 'yup'
import { es } from 'yup-locales'
import stockService from '~/api/factories/stock';
import storeService from '~/api/factories/store';
import branchService from '~/api/factories/branch';
setLocale(es)

const useLoader = useLoaderStore()
// Props
const props = defineProps({
    materialRequestData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' },
    btnActionLabel: { type: String, required: false, default: 'Guardar' }
})
const { action, btnActionLabel } = toRefs(props)

// Emits
const emit = defineEmits(['actionSubmit', 'hideModal'])

// Form schema
const getValidationSchema = computed(() => {
    const schema = {
        store: string().required(" "),
        stock_requests: array().required("La lista de materiales es requerida"),
        finished: boolean(),
    }
    return object(schema)
})
const validationSchema = getValidationSchema
const { defineField, errors, handleSubmit, meta } = useForm({
    validationSchema
});

// Refs
const [store] = defineField('store')
const [stock_requests] = defineField('stock_requests')
const [finished] = defineField('finished')
const stocks = ref([])
const stores = ref([])
const branches = ref([])
const canAdd = ref(false)
stock_requests.value = [{ stock: { amount: 0, new_amount: 0, item: "", id: null } }]
const branch = ref("")
// Functions
const submit = handleSubmit(() => {
    emit('actionSubmit', generatePayload(), props.materialRequestData?.id || null)
})
function generatePayload() {
    const payload = {
        store: store.value,
        finished: finished.value,
        stock_requests: []
    }
    stock_requests.value.forEach(material => {
        payload.stock_requests.push(material)
    });
    return JSON.stringify(payload)
}
function onShown() {
    if (action.value === 'create') {
        branch.value = ""
        store.value = ""
        stock_requests.value = [{ stock: { amount: 0, new_amount: 0, item: "", id: null } }]
        finished.value = false
    }
    if (action.value !== 'create' && props.materialRequestData) {
        branch.value = props.materialRequestData.store.branch.id
        store.value = props.materialRequestData.store
        stock_requests.value = props.materialRequestData.stock_requests
        finished.value = props.materialRequestData.finished
    }
}
function remove(i) {
    stock_requests.value.splice(i, 1)
    canAdd.value = true
}
function addMore() {
    listStocks({})
    stock_requests.value.push({ stock: { amount: 0, new_amount: 0, item: "", id: null } })
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
function listStocks({ search = "", loading = null }) {
    const payload = {
        search,
        exclude: materialIds.value,
        store: store.value,
        only_existences: true
    }
    stockService.list(payload).then((res) => {
        stocks.value = res.data.stock_items
        if (stocks.value.length > 1) {
            canAdd.value = true
        } else canAdd.value = false
        if (loading) {
            setTimeout(() => {
                loading(false)
                useLoader.enableLoader()
            }, 700)
        }
    })
}
function onSearchStocks(search, loading) {
    if (search.length) {
        useLoader.disableLoader()
        loading(true);
        listStocks({ search, loading });
    }
}
function onSearchStores(search, loading) {
    if (search.length) {
        useLoader.disableLoader()
        loading(true);
        listStores({ search, loading });
    }
}
function limitAmount(evt, vModel, limit) {
    if (parseFloat(evt.target.value) >= limit) {
        // eslint-disable-next-line no-param-reassign
        evt.target.value = limit;
        vModel.stock.new_amount = limit;
    }
}

// Computed
const materialIds = computed(() => {
    const idArray = []
    if (stock_requests.value.length > 0) {
        stock_requests.value.forEach((material) => {
            if (material.stock) {
                idArray.push(material.stock.id)
            }
        });
        return idArray
    }
    return idArray
})
const vaidMaterials = computed(() => {
    if (stock_requests.value.length <= 0) {
        return false
    } else {
        for (let index = 0; index < stock_requests.value.length; index++) {
            if (stock_requests.value[index].stock.new_amount) {
                if (stock_requests.value[index].stock.new_amount <= 0 || stock_requests.value[index].stock.new_amount === '') {
                    return false
                }
            } else {
                return false
            }
        }
    }
    return true
})

// Hooks
onMounted(() => {
    listBranches({})
})
watch(branch, () => {
    listStores({})
})
watch(store, () => {
    stock_requests.value = [{ stock: { amount: 0, new_amount: 0, item: "", id: null } }]
    listStocks({})
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
                    <v-select label="name" v-model="branch" :filterable="false" :options="branches"
                        :reduce="(option) => option.id" @search="(search, loading) =>
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
            <hr />
            <div class="mb-3"><label for="form-label">Lista de items</label></div>
            <div class="col-12" v-for="(item, index) in stock_requests" :key="'ITEM_REQUEST' + index">
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <v-select :clearable="false"
                            @option:deselected="item.stock = { amount: 0, new_amount: 0, item: '', id: null };"
                            :disabled="!store" class="col-8" label="item" v-model="item.stock" :filterable="false"
                            :options="stocks" :reduce="(option) => option" @search="(search, loading) =>
                                onSearchStocks(search, loading)
                                ">
                            <template slot="no-options"> Escribe para buscar... </template>
                            <template slot="option" slot-scope="option">
                                <div class="d-center">
                                    {{ option.item }}
                                </div>
                            </template>
                            <template slot="selected-option" slot-scope="option">
                                <div class="selected d-center">
                                    {{ option.item }}
                                </div>
                            </template>
                        </v-select>
                        <div class="col-2">
                            <input @keyup="limitAmount($event, item, item.stock.amount)"
                                class="form-control text-center" type="number" v-model="item.stock.new_amount"
                                :max="item.stock.amount" />
                        </div>
                        <div class="col-1 text-end" v-if="stock_requests.length > 1">
                            <font-awesome-icon class="btn text-primary" @click="remove(index)" :icon="['fa', 'minus']"
                                size="lg" />
                        </div>
                        <div v-else class="col-1 text-end"></div>

                    </div>
                    <div class="invalid-feedback d-block" v-if="errors.item">
                        {{ errors.item }}
                    </div>
                </div>
            </div>
            <div v-if="canAdd" class="col-12 my-4 text-end"><button type="button" :disabled="!vaidMaterials"
                    class="form-control btn btn-primary py-1 rounded-5" @click="addMore">Agregar otro material</button>
            </div>
            <hr />
            <div v-if="action !== 'create'" lass="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="finished" :true-value="true"
                        :false-value="false" id="finished">
                    <label class="form-check-label" for="finished">
                        Terminado
                    </label>
                </div>
            </div>
            <div class="row mx-0 px-0 justify-content-between align-materialRequests-center mt-3">
                <div class="col-6">
                    <button type="button" class="btn btn-secondary w-100" @click="emit('hideModal')"
                        data-bs-dismiss="modal">
                        Cerrar
                    </button>
                </div>
                <div class="col-6">
                    <button :disabled="!meta.valid || !vaidMaterials" type="submit" class="btn btn-primary w-100">
                        {{ btnActionLabel }}
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>