export const stockIcons = [
    {
        text: 'Edición de stock',
        icon: 'edit',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'updateItem'
    },
    {
        text: 'Eliminar stock',
        icon: 'trash-can',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'destroyItem'
    }
]
export const stockFields = [
    {
        key: 'store',
        label: 'Almacen',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'item',
        label: 'Item',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'amount',
        label: 'Cantidad',
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
