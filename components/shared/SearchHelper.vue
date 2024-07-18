<script setup>

// Props
const props = defineProps({
  colValue: { type: Number, required: false, default: 1 },
  placeholder: { type: String, required: false, default: 'Search' },
  aditionalInputClass: { type: String, required: false, default: '' },
  aditionalContainerClass: { type: String, required: false, default: '' },
  aditionalMainClass: { type: String, required: false, default: '' }
})
const { placeholder, aditionalMainClass } = toRefs(props)

// Emits
const emit = defineEmits(['search'])

// Stores
const searchStore = useSearchStore()

// Functions
function clearSearch() {
  searchValue.value = ''
  emit('search', searchValue.value)
}
function emptyText() {
  if (searchValue.value === '') emit('search', '')
}

// Computed
const stringClassByRules = computed(() => {
  return `col-${props.colValue || 12} ` + props.aditionalContainerClass
})
const searchValue = computed({
  get: () => searchStore.searchValue,
  set: (newValue) => {
    searchStore.updateSearch(newValue)
  }
})
</script>

<template>
  <div class="row align-items-end mb-3" :class="aditionalMainClass">
    <div :class="stringClassByRules" class="input-search layoutContainer">
      <label class="form-label">Buscador</label>
      <input :class="'input-search form-control border-end-0 border ' + aditionalInputClass" type="text"
        v-model="searchValue" @change="emptyText" @keyup.enter="emit('search', $event.target.value)"
        :placeholder="placeholder" id="example-search-input" />
      <button class="clear-icon" type="button" @click="clearSearch" v-if="searchValue">
        <font-awesome-icon icon="fa-solid fa-times" />
      </button>
    </div>
    <slot name="extraElements"></slot>
  </div>
</template>
