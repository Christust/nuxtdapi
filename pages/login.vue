<script setup lang="ts">
definePageMeta({
  layout: "login",
});
</script>

<template>
  <div class="loginPage">
    <div class="card shadow col-6 p-5">
      <form class="row justify-content-center">
        <div class="mb-3">
          <label class="form-label" htmlFor="email"> Usuario </label>
          <input name="email" />
          <div class="invalid-feedback">{errors.email}</div>
        </div>
        <div class="mb-3">
          <label class="form-label" htmlFor="password"> Contraseña </label>
          <input name="password" type="password" />
          <div class="invalid-feedback">{errors.password}</div>
        </div>
        <button class="btn btn-primary" type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
