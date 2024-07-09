export const itemIcons = [
    {
        text: 'Edición de item',
        icon: 'edit',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'updateItem'
    },
    {
        text: 'Eliminar item',
        icon: 'trash-can',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'destroyItem'
    }
]
export const itemFields = [
    {
        key: 'consumable',
        label: 'Consumible',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'name',
        label: 'Nombre',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'barcode',
        label: 'Codigo de barras',
        thClass: 'text-center',
        tdClass: 'text-center align-middle'
    },
    {
        key: 'brand',
        label: 'Marca',
        thClass: 'text-center',
        tdClass: 'text-center align-middle'
    },
    {
        key: 'brand',
        label: 'Marca',
        thClass: 'text-center',
        tdClass: 'text-center align-middle'
    },
    {
        key: 'units',
        label: 'Unidades',
        thClass: 'text-center',
        tdClass: 'text-center align-middle'
    },
    {
        key: 'actions',
        label: '',
        thClass: 'text-center',
        tdClass: 'text-center align-middle'
    }
]

export const unitLabels: any = {
    units: "Unidades",
    meters: "Metros",
    liters: "Litros"
}