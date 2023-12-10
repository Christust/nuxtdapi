<script lang="ts" setup>
export interface Props {
  body: string;
  title: string;
  cancelText?: string;
  acceptText?: string;
  haveAcceptOption?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  cancelText: "Cancelar",
  acceptText: "Aceptar",
  haveAcceptOption: false,
});
</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5"
            id="exampleModalLabel"
            v-text="title"
          ></h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-text="body"></div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            v-text="cancelText"
          ></button>
          <button
            v-if="haveAcceptOption"
            type="button"
            class="btn btn-primary"
            @click="$emit('acceptAction')"
            v-text="acceptText"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
