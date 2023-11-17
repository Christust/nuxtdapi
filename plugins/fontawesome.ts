import {
  library,
  config,
  type IconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

const fasIcons: IconDefinition[] = [fas.faMicrochip];
const farIcons: IconDefinition[] = [];
const fabIcons: IconDefinition[] = [];

fasIcons.forEach((icon) => {
  library.add(icon);
});
fabIcons.forEach((icon) => {
  library.add(icon);
});
farIcons.forEach((icon) => {
  library.add(icon);
});

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
