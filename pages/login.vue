<script setup lang="ts">
definePageMeta({
  layout: "login",
});

import authService from "~/api/factories/auth";
const email = ref("");
const password = ref("");
const authStore = useAuthStore();

function login() {
  const payload = {
    email: email.value,
    password: password.value,
  };
  authService.login(payload).then(
    (res: any) => {
      authStore.login(res)
    },
    (error: any) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div class="loginPage">
    <div class="card shadow col-6 p-5">
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
      <button class="btn btn-primary" @click="login">Enviar</button>
    </div>
  </div>
</template>

<style scoped></style>
