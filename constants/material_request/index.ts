export const materialRequestIcons = [
  {
    text: "Devolución de material",
    icon: "edit",
    iconSize: "xl",
    iconType: "fa",
    action: "update",
  },
  {
    text: "Eliminar petición de materiales",
    icon: "trash-can",
    iconSize: "xl",
    iconType: "fa",
    action: "destroy",
  },
];

export function pointOptions(options: string[]) {
  return materialRequestFields.filter((option: any) => {
    options.includes(option.action);
  });
}
export const materialRequestFields = [
  {
    key: "finished",
    label: "Estatus",
    thClass: "text-center",
    tdClass: "text-center align-middle",
  },
  {
    key: "branch_name",
    label: "Sucursal",
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
