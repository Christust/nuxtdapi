export const materialRequestIcons = [
  {
    text: "Devolución de material",
    icon: "edit",
    iconSize: "xl",
    iconType: "fa",
    action: "updateMaterialRequest",
  },
  {
    text: "Eliminar petición de materiales",
    icon: "trash-can",
    iconSize: "xl",
    iconType: "fa",
    action: "destroyMaterialRequest",
  },
];
export const materialRequestFields = [
  {
    key: "finished",
    label: "Estatus",
    thClass: "text-center",
    tdClass: "text-center align-middle",
  },
  {
    key: "store_name",
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
