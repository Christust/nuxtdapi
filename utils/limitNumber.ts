export default function (evt: any, vmodel: any, limit: number) {
  // eslint-disable-next-line no-param-reassign
  evt = evt || window.event;
  if (parseFloat(evt.target.value) >= limit) {
    // eslint-disable-next-line no-param-reassign
    evt.target.value = limit;
    vmodel = limit;
  }
}
