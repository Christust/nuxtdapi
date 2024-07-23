export default function (evt: any) {
    let charCode = evt.which ? evt.which : evt.keyCode
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault()
    } else {
        return true
    }
}