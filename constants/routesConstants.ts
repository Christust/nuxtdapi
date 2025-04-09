export type Route = {
    route: string,
    name: string,
    icon: string,
};

export const routes : Route[] = [
  {
    route: "/",
    name: "Inicio",
    icon: "fa-solid fa-house",
  },
  {
    route: "/branches",
    name: "Sucursales",
    icon: "fa-solid fa-code-branch",
  },
  {
    route: "/stores",
    name: "Almacenes",
    icon: "fa-solid fa-boxes-stacked",
  },
  {
    route: "/items",
    name: "Items",
    icon: "fa-solid fa-box",
  },
];
