<script lang="ts" setup>
import itemService from '~/api/factories/item';
import { unitLabels, itemFields, itemIcons } from '~/constants/item';
// Stores
const searchStore = useSearchStore()

// Refs
const items = ref<Item[]>()
const itemData = ref<Item>()
const total = ref(0)
const limit = ref(5)
const activePage = ref(1)
const itemAction = ref('create')
const paginationHelper = ref<HTMLInputElement | any>(null)
const searchComponent = ref<HTMLInputElement | any>(null)
const itemModal = ref<HTMLInputElement | any>(null)

// Functions
function unitLabel(unit: string) {
  return unitLabels[unit] || unitLabels.units
}
function listItems({ page = 0, search = null }) {
  activePage.value = page !== 0 ? page : activePage.value
  const payload = {
    page: page || activePage.value,
    limit: limit.value,
    search: search || searchStore.searchValue
  }
  itemService.list(payload).then((res) => {
    items.value = res.data.items
    total.value = res.data.total
    limit.value = res.data.limit
  })
}
function createItem() {
  itemAction.value = 'create'
  itemModal.value.showModal()
}
function updateItem(info: Item) {
  itemAction.value = 'update'
  itemData.value = info
  itemModal.value.showModal()
}
function destroyItem(info: Item) {
  itemAction.value = 'destroy'
  itemData.value = info
  itemModal.value.showModal()
}
function actionPoint(actionPoint: string, info: Item) {
  switch (actionPoint) {
    case 'updateItem':
      updateItem(info)
      return
    case 'destroyItem':
      destroyItem(info)
      return
    default:
      return
  }
}
function changePage(page: number) {
  listItems({ page })
}
function searchItems() {
  listItems({ page: 1 })
}

// Hooks
onMounted(() => (
  listItems({})
))
</script>

<template>
  <div class="d-flex justify-content-end mb-3">
    <div class="col-3 text-end"><button @click="createItem" class="btn btn-primary">Crear Item</button></div>
  </div>
  <div class="card rounded-4 p-4 shadow">
    <SharedSearchHelper ref="searchComponent" :colValue="3" :placeholder="'Buscador de items'" class="mb-4"
      @search="searchItems" />
    <SharedTableHelper :fields="itemFields" :records="items">
      <template #cell(consumable)="record">
        <font-awesome-icon icon="fa-solid fa-square-check" size="lg"
          :class="record.consumable ? 'text-success' : 'text-body-tertiary'" />
      </template>
      <template #cell(units)="record">
        <span v-text="unitLabel(record.units)"></span>
      </template>
      <template #cell(unit_price)="record">
        <span v-text="formatCurrency(record.unit_price)"></span>
      </template>
      <template #cell(actions)="record">
        <SharedPointsMenu @action="actionPoint" :iconsRender="itemIcons" :info="record" />
      </template>
    </SharedTableHelper>
    <SharedPaginationHelper ref="paginationHelper" :showCountText="false" :activeClass="true" :justifyClass="'end'"
      :totalRecords="total" :limit="limit" :externalPage="activePage" @changePage="changePage" />
    <ItemModal ref="itemModal" :itemData="itemData" :action="itemAction" @reloadItems="listItems({})" />
  </div>
</template>


