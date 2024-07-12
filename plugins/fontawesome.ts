import {
  library,
  config,
  type IconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

const fasIcons: IconDefinition[] = [fas.faMicrochip, fas.faPenToSquare, fas.faTrashCan, fas.faHouse, fas.faCircleQuestion, fas.faDoorOpen, fas.faEllipsis, fas.faCaretUp, fas.faCaretDown, fas.faTimes, fas.faChevronRight, fas.faChevronLeft, fas.faSquareCheck, fas.faCodeBranch, fas.faBoxesStacked, fas.faBox, fas.faBoxArchive, fas.faStore];
const farIcons: IconDefinition[] = [far.faSquareCheck];
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



export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
