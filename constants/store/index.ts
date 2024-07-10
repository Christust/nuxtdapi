export const storeIcons = [
    {
        text: 'Edición de almacen',
        icon: 'edit',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'updateStore'
    },
    {
        text: 'Eliminar almacen',
        icon: 'trash-can',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'destroyStore'
    }
]
export const storeFields = [
    {
        key: 'name',
        label: 'Nombre',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'branch',
        label: 'Sucursal',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'actions',
        label: '',
        thClass: 'text-center',
        tdClass: 'text-center align-middle'
    }
]