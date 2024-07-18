<script setup>
import { useForm } from 'vee-validate'
import { object, string, boolean, setLocale, number } from 'yup'
import { es } from 'yup-locales'
setLocale(es)

// Props
const props = defineProps({
    itemData: { type: Object, required: false, default: () => { } },
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
        description: string().required("La descripción es requerida"),
        brand: string().required("La marca es requerida"),
        unit_price: number().typeError('el precio unitario debe ser un numero').required("El precio unitario es requerido"),
        barcode: string(),
        units: string().required(),
        consumable: boolean(),
    }
    return object(schema)
})
const validationSchema = getValidationSchema
const { defineField, errors, handleSubmit, meta } = useForm({
    validationSchema
});

// Refs
const [name] = defineField('name')
const [description] = defineField('description')
const [brand] = defineField('brand')
const [unit_price] = defineField('unit_price')
const [barcode] = defineField('barcode')
const [units] = defineField('units')
const [consumable] = defineField('consumable')

// Functions
const submit = handleSubmit(() => {
    emit('actionSubmit', generatePayload(), props.itemData?.id || null)
})
function generatePayload() {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('description', description.value)
    formData.append('brand', brand.value)
    formData.append('unit_price', unit_price.value)
    formData.append('barcode', barcode.value)
    formData.append('units', units.value)
    formData.append('consumable', consumable.value)
    return formData
}
function onShown() {
    if (action.value === 'create') {
        name.value = ""
        description.value = ""
        brand.value = ""
        unit_price.value = ""
        barcode.value = ""
        units.value = "units"
        consumable.value = false
    }
    if (action.value !== 'create' && props.itemData) {
        name.value = props.itemData.name
        description.value = props.itemData.description
        brand.value = props.itemData.brand
        unit_price.value = props.itemData.unit_price
        barcode.value = props.itemData.barcode
        units.value = props.itemData.units
        consumable.value = props.itemData.consumable ? true : false
    }
}

// Hooks
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
                    <label for="description" class="form-label">Descripción</label>
                    <textarea style="resize: none;" rows="3" id="description" class="form-control"
                        v-model="description"></textarea>
                    <div class="invalid-feedback d-block" v-if="errors.description">
                        {{ errors.description }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="brand" class="form-label">Marca</label>
                    <input id="brand" type="text" class="form-control" v-model="brand">
                    <div class="invalid-feedback d-block" v-if="errors.brand">
                        {{ errors.brand }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="barcode" class="form-label">Codigo de barras</label>
                    <input id="barcode" type="text" class="form-control" v-model="barcode">
                    <div class="invalid-feedback d-block" v-if="errors.barcode">
                        {{ errors.barcode }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="unit_price" class="form-label">Precio unitario</label>
                    <input @keypress="useNumber($event)" id="unit_price" type="number" class="form-control"
                        v-model="unit_price">
                    <div class="invalid-feedback d-block" v-if="errors.unit_price">
                        {{ errors.unit_price }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="mb-3">
                    <label for="units" class="form-label">Unidades</label>
                    <select class="form-select" v-model="units">
                        <option selected value="units">Unidades</option>
                        <option value="meters">Metros</option>
                        <option value="liters">Litros</option>
                    </select>
                    <div class="invalid-feedback d-block" v-if="errors.units">
                        {{ errors.units }}
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="consumable" :true-value="true"
                        :false-value="false" id="consumable">
                    <label class="form-check-label" for="consumable">
                        Consumible
                    </label>
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