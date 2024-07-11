<script lang="ts" setup>
import stockService from '~/api/factories/stock';
import { stockFields, stockIcons } from '~/constants/stock';
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

// Functions
function getStocks({ page = 0, search = null }) {
    activePage.value = page !== 0 ? page : activePage.value
    const payload = {
        page: page || activePage.value,
        limit: limit.value,
        search: search || searchStore.searchValue
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
    getStocks({ page })
}
function searchStocks() {
    getStocks({ page: 1 })
}

// Hooks
onMounted(() => (
    getStocks({})
))
</script>

<template>
    {{ $route.params.id }}
    <div class="d-flex justify-content-end mb-3">
        <div class="col-3 text-end"><button @click="createStock" class="btn btn-primary">Crear Stock</button></div>
    </div>
    <div class="card rounded-4 p-4 shadow">
        <SharedSearchHelper ref="searchComponent" :colValue="3" :placeholder="'Buscador de productos'" class="mb-4"
            @search="searchStocks" />
        <SharedTableHelper :fields="stockFields" :records="stocks">
            <template #cell(consumable)="record">
                <font-awesome-icon icon="fa-solid fa-square-check" size="lg"
                    :class="record.consumable ? 'text-success' : 'text-body-tertiary'" />
            </template>
            <template #cell(units)="record">
                <span v-text="unitLabel(record.units)"></span>
            </template>
            <template #cell(actions)="record">
                <SharedPointsMenu @action="actionPoint" :iconsRender="stockIcons" :info="record" />
            </template>
        </SharedTableHelper>
        <SharedPaginationHelper ref="paginationHelper" :showCountText="false" :activeClass="true" :justifyClass="'end'"
            :totalRecords="total" :limit="limit" :externalPage="activePage" @changePage="changePage" />
        <StockModal ref="stockModal" :stockData="stockData" :action="stockAction" @reloadStocks="getStocks({})" />
    </div>
</template>

<style scoped></style>
