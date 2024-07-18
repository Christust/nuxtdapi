<script lang="ts" setup>
// Props
defineProps({
    info: { type: Object, required: false, default: () => { } },
    iconsRender: { type: Object, required: true },

})

// Emits
const emit = defineEmits(['action'])

// Contants
let dropInstance: any = null
const idRand = Math.floor(Math.random() * 999).toString(10)
const myDropdownId = Math.floor(Math.random() * 999).toString(10)

// Functions
function toggle(){
    if (dropInstance) {
        dropInstance.toggle()
    }
}
function validIcon(option: any) {
    return [option.iconType, option.icon]
}
function tableOverflow(overflow: any) {
    if (window.innerWidth <= 768) {
        const tableContainer: any = document.querySelector('.table-responsive')
        if (tableContainer) {
            tableContainer.style.overflow = overflow
        }
    } else {
        const tableContainer: any = document.querySelector('.table-responsive')
        if (tableContainer) {
            tableContainer.style.overflow = overflow
        }
    }
}
function activeClass(option: any, info: any) {
    if (option?.activeClass) {
        return info[option?.activeClass] ? 'text-green-active' : 'text-500'
    }
    return 'text-dark'
}

// Hooks
onMounted(() => {
    import('bootstrap').then((bootstrap) => {
        const dropdownElement = document.getElementById(idRand)
        if (dropdownElement) {
            dropInstance = new bootstrap.Dropdown(dropdownElement)
        }
        const myDropdown: any = document.getElementById(myDropdownId)
        if (myDropdown) {
            myDropdown.addEventListener('shown.bs.dropdown', () => {
                tableOverflow('inherit')
            })
            myDropdown.addEventListener('blur', () => {
                tableOverflow('auto')
            })
        }
    })

})

</script>
<template>
    <div :id="myDropdownId" class="dropdown dropdownTableActions">
        <button :id="idRand" @click="toggle" class="btn btn-secondary dropdown-toggle" type="button"
            data-bs-toggle="dropdown" aria-expanded="true">
            <font-awesome-icon class="text-secondary" :icon="['fa', 'ellipsis']" size="lg" />
        </button>
        <ul class="dropdown-menu">
            <div v-for="(option, index) in iconsRender"
                :key="'DIV' + index + option.action + Math.floor(Math.random() * 999)">
                <li class="d-flex align-items-center justify-content-end cursor-pointer px-4"
                    :key="index + option.action + Math.floor(Math.random() * 999)"
                    @click="emit('action', option.action, info)">
                    {{ option.text }}
                    <font-awesome-icon :icon="validIcon(option)" :class="[activeClass(option, info)]"
                        class="cursor-pointer ms-3" :size="option.iconSize" />
                </li>
                <hr v-if="parseInt(index) < iconsRender.length - 1"
                    :key="'HR' + index + option.action + Math.floor(Math.random() * 999)" />
            </div>
        </ul>
    </div>
</template>
