<script setup lang="ts">
import authService from "@/api/factories/auth.js";

definePageMeta({
  layout: "login",
});

const email = ref("");
const password = ref("");
const authStore = useAuthStore();

function login() {
  const payload = {
    email: email.value,
    password: password.value,
  };
  authService.login(payload).then((res: any) => {
    authStore.login(res);
  });
}
</script>

<template>
  <div class="login__page">
    <form @submit.prevent="login" class="card shadow col-5 p-5">
      <div class="d-flex align-items-center justify-content-center mb-4">
        <font-awesome-icon
          icon="fa-solid fa-microchip"
          class="me-2"
          size="2xl"
        />
        <div class="text-start">
          <h3 class="m-0">DAPI</h3>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" htmlFor="email"> Usuario </label>
        <input v-model="email" class="form-control" name="email" />
      </div>
      <div class="mb-3">
        <label class="form-label" htmlFor="password"> Contraseña </label>
        <input
          v-model="password"
          class="form-control"
          name="password"
          type="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </div>
</template>
