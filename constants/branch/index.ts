export const branchIcons = [
    {
        text: 'Edición de branch',
        icon: 'edit',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'updateBranch'
    },
    {
        text: 'Eliminar branch',
        icon: 'trash-can',
        iconSize: 'xl',
        iconType: 'fa',
        action: 'destroyBranch'
    }
]
export const branchFields = [
    {
        key: 'name',
        label: 'Nombre',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'country',
        label: 'País',
        thClass: 'text-center',
        tdClass: 'text-center align-middle',
    },
    {
        key: 'state',
        label: 'Estado',
        thClass: 'text-center',
        tdClass: 'text-center align-middle'
    },
    {
        key: 'city',
        label: 'Ciudad',
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