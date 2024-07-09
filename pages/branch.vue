<script lang="ts" setup>
import branchService from '~/api/factories/branch';
import { branchFields, branchIcons } from '~/constants/branch';

// Stores
const searchStore = useSearchStore()

// Refs
const branchs = ref()
const branchData = ref({})
const total = ref(0)
const limit = ref(5)
const activePage = ref(1)
const branchAction = ref('create')
const paginationHelper = ref<HTMLInputElement | any>(null)
const searchComponent = ref<HTMLInputElement | any>(null)
const branchModal = ref<HTMLInputElement | any>(null)

// Functions
function listBranchs({ page = 0, search = null }) {
  activePage.value = page !== 0 ? page : activePage.value
  const payload = {
    page: page || activePage.value,
    limit: limit.value,
    search: search || searchStore.searchValue
  }
  branchService.list(payload).then((res) => {
    branchs.value = res.data;

  })
}
function createBranch() {
  branchAction.value = 'create'
  branchModal.value.showModal()
}
function updateBranch(info: any) {
  branchAction.value = 'update'
  branchData.value = info
  branchModal.value.showModal()
}
function destroyBranch(info: any) {
  branchAction.value = 'destroy'
  branchData.value = info
  branchModal.value.showModal()
}
function actionPoint(actionPoint: string, info: any) {
  switch (actionPoint) {
    case 'updateBranch':
      updateBranch(info)
      return
    case 'destroyBranch':
      destroyBranch(info)
      return
    default:
      return
  }
}
function changePage(page: number) {
  listBranchs({ page })
}
function searchBranchs() {
  listBranchs({ page: 1 })
}

// Hooks
onMounted(() => (
  listBranchs({})
))
</script>

<template>
  <div class="d-flex justify-content-end mb-3">
    <div class="col-3 text-end"><button @click="createBranch" class="btn btn-primary">Crear Branch</button></div>
  </div>
  <div class="card rounded-4 p-4 shadow">
    <SharedSearchHelper ref="searchComponent" :colValue="3" :placeholder="'Buscador de productos'" class="mb-4"
      @search="searchBranchs" />
    <SharedTableHelper :fields="branchFields" :records="branchs">
      <template #cell(actions)="record">
        <SharedPointsMenu @action="actionPoint" :iconsRender="branchIcons" :info="record" />
      </template>
    </SharedTableHelper>
    <SharedPaginationHelper ref="paginationHelper" :showCountText="false" :activeClass="true" :justifyClass="'end'"
      :totalRecords="total" :limit="limit" :externalPage="activePage" @changePage="changePage" />
    <BranchModal ref="branchModal" :branchData="branchData" :action="branchAction" @reloadBranchs="listBranchs({})" />
  </div>
</template>

<style scoped></style>
