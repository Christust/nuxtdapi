export const stockIcons = [
    {
        text: 'Edición de stock',
        icon: 'edit',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'updateStock'
    },
    {
        text: 'Eliminar stock',
        icon: 'trash-can',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'destroyStock'
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
