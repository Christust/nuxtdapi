<script setup lang="ts">
const frontendTecnologies = ref([
  "Nextjs - React",
  "Redux",
  "Bootstrap",
  "Axios",
  "Yup",
  "Formik",
  "Fontawesome",
  "Authgrads",
]);
const backendTecnologies = ref([
  "Django",
  "DjangoRestFramework",
  "SimpleJWT",
  "Swagger",
  "Sistema de autenticación",
  "CRUDs completos",
]);

const authStore = useAuthStore();

function showAction() {
  alert("emit");
}
</script>

<template>
  <div>
    <main>
      <div>
        <p>
          Este proyecto fue construido con la intención de que sirviera de
          practica para la implementación de diferentes tecnologias y
          herramientas de una forma concentrada.
        </p>
        <div class="d-flex justify-content-around my-5">
          <div class="card cardGradient shadow p-3 col-5">
            <div class="card-body">
              <h5 class="card-title">Frontend</h5>
              <p class="card-text">
                Para el frontend hasta el momento se esta utilizando lo
                siguiente:
              </p>
              <ul>
                <li v-for="(tecnologie, index) in frontendTecnologies" :key="tecnologie + index" v-text="tecnologie">
                </li>
              </ul>
            </div>
          </div>

          <div class="card cardGradient shadow p-3 col-5">
            <div class="card-body">
              <h5 class="card-title">Backend</h5>
              <p class="card-text">
                Para el backend hasta el momento se esta utilizando lo
                siguiente:
              </p>
              <ul>
                <li v-for="(tecnologie, index) in backendTecnologies" :key="tecnologie + index" v-text="tecnologie">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
