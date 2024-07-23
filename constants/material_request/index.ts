export const materialRequestIcons = [
  {
    text: "Edición de petición de materiales",
    icon: "edit",
    iconSize: "xl",
    iconType: "fa",
    action: "updateItem",
  },
  {
    text: "Eliminar petición de materiales",
    icon: "trash-can",
    iconSize: "xl",
    iconType: "fa",
    action: "destroyItem",
  },
];
export const materialRequestFields = [
  {
    key: "id",
    label: "Id",
    thClass: "text-center",
    tdClass: "text-center align-middle",
  },
  {
    key: "store",
    label: "Almacen",
    thClass: "text-center",
    tdClass: "text-center align-middle",
  },
  {
    key: "user",
    label: "Usuario",
    thClass: "text-center",
    tdClass: "text-center align-middle",
  },
  {
    key: "actions",
    label: "",
    thClass: "text-center",
    tdClass: "text-center align-middle",
  },
];
