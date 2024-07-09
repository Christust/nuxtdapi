<script setup>
// Props
const props = defineProps({
  totalRecords: { type: Number, required: true, default: 1 },
  limit: { type: Number, required: true, default: 1 },
  externalPage: { type: Number, required: false, default: 1 },
  activeClass: { type: Boolean, required: false, default: false },
  justifyClass: { type: String, required: false, default: null },
  showCountText: { type: Boolean, required: false, default: true }
})
const { totalRecords, limit, externalPage, activeClass } = toRefs(props)

// Refs
const activePage = ref(1)

// Emits
const emit = defineEmits(['changePage'])

// Functions
const prevPage = () => {
  if (activePage.value > 1) {
    activePage.value--
  }
  emit('changePage', activePage.value)
}
const nextPage = () => {
  if (activePage.value < totalPages.value) {
    activePage.value++
  }
  emit('changePage', activePage.value)
}
const goToPage = (page) => {
  activePage.value = page
  emit('changePage', activePage.value)
}

// Computed
const totalPages = computed(() => Math.ceil(totalRecords.value / limit.value))
const externalPageValue = computed(() => externalPage.value)
const activePages = computed(() => {
  const start = Math.max(activePage.value - 2, 1)
  const end = Math.min(start + 4, totalPages.value)
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
})

// Hooks
watch(externalPageValue, () => {
  activePage.value = externalPageValue.value
})
defineExpose({
  activePage
})
</script>
<template>
  <div class="row d-flex align-items-center" v-if="totalRecords > 0"
    :class="` justify-content-${props.justifyClass || 'between'}`">
    <div v-if="props.showCountText" class="col-6 text-end">
      <p>
        <span class="text-secondary me-3">Mostrando:</span>
        <span class="text-secondary">{{ activePage }} de {{ totalPages }}</span>
      </p>
    </div>
    <div class="col-6">
      <nav aria-label="Page navigation">
        <ul class="pagination align-items-center" :class="` justify-content-${props.justifyClass || 'end'}`">
          <li class="me-4 text-secondary cursor-pointer" :class="{
            customPageItem: activeClass
          }">
            <a class="page-link border-0" :class="{
              'text-primary-app': activeClass,
              'text-secondary': !activeClass,
              customPageActiveHover: activeClass
            }" @click="prevPage" :disabled="activePage === 1" v-if="activePage !== 1">
              <font-awesome-icon icon="fa-solid fa-chevron-left" size="xs" />
            </a>
          </li>
          <li class="me-2" :class="{
            customPageActive: activePage === page && activeClass,
            customActiveClass: activePage === page && activeClass,
            customPageItem: activeClass
          }" v-for="page in activePages" :key="page">
            <a class="page-link" :class="{
              pageActive: activePage === page && !activeClass,
              'text-secondary': activePage !== page,
              customPageActive: activePage === page && activeClass,
              customPageActiveHover: activePage !== page && activeClass,
              'cursor-pointer': activePage !== page && activeClass,
              'border-0': activePage !== page || activeClass
            }" @click="goToPage(page)">{{ page }}</a>
          </li>
          <li class="ms-1 text-secondary cursor-pointer" :class="{
            customPageItem: activeClass
          }">
            <a class="page-link border-0" :class="{
              'text-primary-app': activeClass,
              'text-secondary': !activeClass,
              customPageActiveHover: activeClass
            }" @click="nextPage" :disabled="activePage === totalPages" v-if="activePage !== totalPages">
              <font-awesome-icon icon="fa-solid fa-chevron-right" size="xs" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
