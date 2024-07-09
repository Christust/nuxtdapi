<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  fields: { type: Array, required: true, default: () => [] },
  records: { type: Array, required: true, default: () => [] },
  rowClickActive: { type: Boolean, required: false, default: false },
  rowClickFunction: { type: Function, required: false, default: () => false },
  exposeSort: { type: Boolean, required: false, default: false },
  tableClass: { type: String, required: false, default: '' }
})

const emit = defineEmits(['actionSort'])

const sortOrder = ref(1)
const sortBy = ref('')

function rowClickHandler(clickActive = true, id) {
  if (!props.rowClickActive || !clickActive) return
  props.rowClickFunction(id)
}

function sort(field, sortable) {
  if (!sortable) return
  if (props.exposeSort) {
    sortOrder.value = -sortOrder.value
    sortBy.value = field
    emit('actionSort', field, sortOrder.value > 0 ? 'asc' : 'desc')
    return
  }
  if (sortBy.value === field) {
    sortOrder.value = -sortOrder.value
  } else {
    // eslint-disable-next-line vue/no-mutating-props
    sortBy.value = field
  }
}

const sortedList = computed(() => {
  if (sortBy.value != '' && !props.exposeSort) {
    return [...props.records]
      .map((i) => ({ ...i, value: i.number ? parseFloat(i.value) : i.value }))
      .sort((a, b) => {
        if (a[sortBy.value] >= b[sortBy.value]) {
          return sortOrder.value
        }
        return -sortOrder.value
      })
  } else return props.records
})
</script>

<template>
  <div>
    <div class="table-responsive">
      <table class="table" :class="tableClass">
        <thead>
          <tr>
            <th aria-sort="ascending" @click="sort(field.key, field.sortable)" v-for="field in fields" :key="field.key"
              :class="field?.thClass">
              {{ field.label }}
              <span class="layoutContainer ms-2" v-if="field.sortable">
                <font-awesome-icon class="arrowTable arrowTable__top"
                  :class="sortOrder < 0 && sortBy == field.key ? ' text-dark' : ' text-secondary'"
                  icon="fa-solid fa-caret-up" size="lg" />
                <font-awesome-icon class="arrowTable arrowTable__bottom"
                  :class="sortOrder > 0 && sortBy == field.key ? ' text-dark' : ' text-secondary'"
                  icon="fa-solid fa-caret-down" size="lg" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in sortedList" :key="record.id">
            <td v-for="field in fields" :key="field.key" :class="field?.tdClass"
              @click="rowClickHandler(field?.rowClickActive, record?.id)">
              <slot :name="'cell(' + field.key + ')'" :index="index" v-bind="record">{{
                record[field.key]
                }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-center" v-if="records.length < 1">- No hay registros -</p>
    </div>
  </div>
</template>
