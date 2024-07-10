<script setup>
import { useForm } from 'vee-validate'
import { object, string, setLocale } from 'yup'
import { es } from 'yup-locales'
import branchService from '~/api/factories/branch';
setLocale(es)

// Props
const props = defineProps({
    branchData: { type: Object, required: false, default: () => { } },
    action: { type: String, required: false, default: 'create' },
    btnActionLabel: { type: String, required: false, default: 'Guardar' }
})
const { action, btnActionLabel } = toRefs(props)

// Form schema
const getValidationSchema = computed(() => {
    const schema = {
        name: string().required("El nombre es requerido"),
        country: string().required("el país es requerido"),
        state: string().required("El estado es requerido"),
        city: string().required("La ciudad es requerida"),
    }
    return object(schema)
})
const validationSchema = getValidationSchema
const { defineField, errors, handleSubmit, meta } = useForm({
    validationSchema
});

// Refs
const [name] = defineField('name')
const [country] = defineField('country')
const [state] = defineField('state')
const [city] = defineField('city')
const countries = ref([])
const states = ref([])
const cities = ref([])

// Emits
const emit = defineEmits(['actionSubmit', 'hideModal'])

// Functions
const submit = handleSubmit(() => {
    emit('actionSubmit', generatePayload(), props.branchData?.id || null)
})
function generatePayload() {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('country', country.value)
    formData.append('state', state.value)
    formData.append('city', city.value)
    return formData
}
function onShown() {
    if (action.value === 'create') {
        name.value = ""
        country.value = ""
        state.value = ""
        city.value = ""
    }
    if (action.value !== 'create' && props.branchData) {
        name.value = props.branchData.name
        country.value = props.branchData.country.id
        listStates()
        state.value = props.branchData.state.id
        listCities()
        city.value = props.branchData.city.id
    }
}
function listCountries() {
    branchService.listCountries().then((res) => {
        countries.value = res.data
    })
}
function listStates() {
    const payload = {
        country: country.value
    }
    branchService.listStates(payload).then((res) => {
        states.value = res.data
    })
}
function listCities() {
    const payload = {
        state: state.value
    }
    branchService.listCities(payload).then((res) => {
        cities.value = res.data
    })
}

// Hooks
onMounted(() => {
    listCountries()
})
defineExpose({
    onShown
})
</script>

<template>
    {{ country }}
    {{ state }}
    {{ city }}
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
                    <label for="country" class="form-label">País</label>
                    <select @change="listStates" class="form-select" v-model="country">
                        <option v-for="countryItem in countries" :key="countryItem.id + countryItem.name + 'COUNTRY'"
                            :value="countryItem.id" v-text="countryItem.name"></option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors.country">
                        {{ errors.country }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="state" class="form-label">Estado</label>
                    <select @change="listCities" class="form-select" v-model="state">
                        <option v-for="stateItem in states" :key="stateItem.id + stateItem.name + 'STATE'"
                            :value="stateItem.id" v-text="stateItem.name"></option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors.state">
                        {{ errors.state }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="city" class="form-label">Ciudad</label>
                    <select class="form-select" v-model="city">
                        <option v-for="cityItem in cities" :key="cityItem.id + cityItem.name + 'CITY'"
                            :value="cityItem.id" v-text="cityItem.name"></option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors.city">
                        {{ errors.city }}
                    </div>
                </div>
            </div>
            <div class="row mx-0 px-0 justify-content-between align-items-center mt-3">
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