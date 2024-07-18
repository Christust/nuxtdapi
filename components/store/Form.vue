<script setup>
import { useForm } from 'vee-validate'
import { object, string, setLocale } from 'yup'
import { es } from 'yup-locales'
import branchService from '~/api/factories/branch';
setLocale(es)

// Props
const props = defineProps({
    storeData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' },
    btnActionLabel: { type: String, required: false, default: 'Guardar' }
})
const { action, btnActionLabel } = toRefs(props)

// Emits
const emit = defineEmits(['actionSubmit', 'hideModal'])

// Form schema
const getValidationSchema = computed(() => {
    const schema = {
        name: string().required("El nombre es requerido"),
        branch: string().required("La sucursal es requerida"),
    }
    return object(schema)
})
const validationSchema = getValidationSchema
const { defineField, errors, handleSubmit, meta } = useForm({
    validationSchema
});

// Refs
const [name] = defineField('name')
const [branch] = defineField('branch')
const branches = ref([])

// Functions
const submit = handleSubmit(() => {
    emit('actionSubmit', generatePayload(), props.storeData?.id || null)
})
function generatePayload() {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('branch', branch.value)
    return formData
}
function onShown() {
    if (action.value === 'create') {
        name.value = ""
        branch.value = ""
    }
    if (action.value !== 'create' && props.storeData) {
        name.value = props.storeData.name
        branch.value = props.storeData.branch.id
    }
}
function listBranches() {
    branchService.list().then((res) => {
        branches.value = res.data.branches
    })
}

// Hooks
onMounted(() => {
    listBranches()
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
                    <label for="name" class="form-label">Nombre</label>
                    <input id="name" type="text" class="form-control" v-model="name">
                    <div class="invalid-feedback d-block" v-if="errors.name">
                        {{ errors.name }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="branch" class="form-label">Sucursal</label>
                    <select class="form-select" v-model="branch">
                        <option v-for="branchItem in branches" :key="branchItem.id + branchItem.name + 'COUNTRY'"
                            :value="branchItem.id" v-text="branchItem.name"></option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors.branch">
                        {{ errors.branch }}
                    </div>
                </div>
            </div>
            <div class="row mx-0 px-0 justify-content-between align-stores-center mt-3">
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