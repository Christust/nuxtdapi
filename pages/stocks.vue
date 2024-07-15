<script lang="ts" setup>
import stockService from '~/api/factories/stock';
import { stockFields, stockIcons } from '~/constants/stock';
import storeService from '~/api/factories/store';
import branchService from '~/api/factories/branch';
// Stores
const searchStore = useSearchStore()

// Refs
const stocks = ref()
const stockData = ref({})
const total = ref(0)
const limit = ref(5)
const activePage = ref(1)
const stockAction = ref('create')
const paginationHelper = ref<HTMLInputElement | any>(null)
const searchComponent = ref<HTMLInputElement | any>(null)
const stockModal = ref<HTMLInputElement | any>(null)
const stores = ref([])
const store = ref(null)
const branches = ref([])
const branch = ref(null)

// Functions
function listStocks({ page = 0, search = null }) {
    activePage.value = page !== 0 ? page : activePage.value
    const payload = {
        page: page || activePage.value,
        limit: limit.value,
        search: search || searchStore.searchValue,
        store: store.value,
        branch: branch.value
    }
    stockService.list(payload).then((res) => {
        stocks.value = res.data.stocks
        total.value = res.data.total
        limit.value = res.data.limit
    })
}
function createStock() {
    stockAction.value = 'create'
    stockModal.value.showModal()
}
function updateStock(info: any) {
    stockAction.value = 'update'
    stockData.value = info
    stockModal.value.showModal()
}
function destroyStock(info: any) {
    stockAction.value = 'destroy'
    stockData.value = info
    stockModal.value.showModal()
}
function actionPoint(actionPoint: string, info: any) {
    switch (actionPoint) {
        case 'updateStock':
            updateStock(info)
            return
        case 'destroyStock':
            destroyStock(info)
            return
        default:
            return
    }
}
function changePage(page: number) {
    listStocks({ page })
}
function searchStocks() {
    listStocks({ page: 1 })
}
function listBranches() {
    const payload = {
        unlimit: true
    }
    branchService.list(payload).then((res) => {
        branches.value = res.data.branches
    })
}
function listStores() {
    store.value = null
    const payload = {
        branch_id: branch.value ? branch.value : null,
        unlimit: true
    }
    storeService.list(payload).then((res) => {
        stores.value = res.data.stores
        listStocks({})
    })

}

// Hooks
onMounted(() => {
    listBranches()
})
onMounted(() => (
    listStocks({})
))
</script>

<template>
    <div class="d-flex justify-content-end mb-3">
        <div class="col-3 text-end"><button @click="createStock" class="btn btn-primary">Crear Stock</button></div>
    </div>
    <div class="card rounded-4 p-4 shadow">
        <SharedSearchHelper ref="searchComponent" :colValue="3" :placeholder="'Buscador de existencias'" class="mb-4"
            @search="searchStocks">
            <template #extraElements>
                <div class="col-2 ms-2">
                    <label class="form-label">Sucursal</label>
                    <select @change="listStores" class="form-select" v-model="branch">
                        <option :value="null" selected>Todas</option>
                        <option v-for="branchItem in branches" :key="branchItem.id + branchItem.name + 'STORE'"
                            :value="branchItem.id" v-text="branchItem.name"></option>
                    </select>
                </div>
                <div class="col-2 ms-2">
                    <label class="form-label">Almacen</label>
                    <select @change="listStocks({})" class="form-select" v-model="store">
                        <option :value="null" selected>Todos</option>
                        <option v-for="storeItem in stores" :key="storeItem.id + storeItem.name + 'STORE'"
                            :value="storeItem.id" v-text="storeItem.name"></option>
                    </select>
                </div>
            </template>
        </SharedSearchHelper>
        <SharedTableHelper :fields="stockFields" :records="stocks">
            <template #cell(branch)="record">
                <span v-text="record.store.branch.name"></span>
            </template>
            <template #cell(store)="record">
                <span v-text="record.store.name"></span>
            </template>
            <template #cell(item)="record">
                <span v-text="record.item.name"></span>
            </template>
            <template #cell(actions)="record">
                <SharedPointsMenu @action="actionPoint" :iconsRender="stockIcons" :info="record" />
            </template>
        </SharedTableHelper>
        <SharedPaginationHelper ref="paginationHelper" :showCountText="false" :activeClass="true" :justifyClass="'end'"
            :totalRecords="total" :limit="limit" :externalPage="activePage" @changePage="changePage" />
        <StockModal ref="stockModal" :stockData="stockData" :action="stockAction" @reloadStocks="listStocks({})" />
    </div>
</template>

<style scoped></style>
