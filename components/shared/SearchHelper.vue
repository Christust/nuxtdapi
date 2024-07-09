<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  colValue: { type: Number, required: false, default: 1 },
  placeholder: { type: String, required: false, default: 'Search' },
  aditionalInputClass: { type: String, required: false, default: '' },
  aditionalContainerClass: { type: String, required: false, default: '' },
  aditionalMainClass: { type: String, required: false, default: '' }
})
const emit = defineEmits(['search'])
const { placeholder, aditionalMainClass } = toRefs(props)
const stringClassByRules = computed(() => {
  return `col-${props.colValue || 12} ` + props.aditionalContainerClass
})

const searchStore = useSearchStore()

const searchValue = computed({
  get: () => searchStore.searchValue,
  set: (newValue) => {
    searchStore.updateSearch(newValue)
  }
})

function clearSearch() {
  searchValue.value = ''
  emit('search', searchValue.value)
}
function emptyText() {
  if (searchValue.value === '') emit('search', '')
}
</script>

<template>
  <div class="d-flex mb-2" :class="aditionalMainClass">
    <div :class="stringClassByRules" class="input-search layoutContainer">
      <input :class="'input-search form-control border-end-0 border ' + aditionalInputClass" type="search"
        v-model="searchValue" @change="emptyText" @keyup.enter="emit('search', $event.target.value)"
        :placeholder="placeholder" id="example-search-input" />
      <button class="clear-icon" type="button" @click="clearSearch" v-if="searchValue">
        <font-awesome-icon icon="fa-solid fa-times" />
      </button>
    </div>
    <slot name="extraElements"></slot>
  </div>
</template>
