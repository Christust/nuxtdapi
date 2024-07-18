<script setup>
const props = defineProps({
  carousel_options: { type: Array, required: false, default: () => [] }
})

const { carousel_options } = toRefs(props)
</script>

<template>
  <div id="carouselAutoplaying" class="carousel slide rounded mb-3" data-bs-ride="carousel"
    v-if="carousel_options.length > 0">
    <div class="carousel-inner">
      <div v-for="(carousel_option, index) in carousel_options" :key="'CAROUSEL_OPTIONS' + index"
        class="carousel-item bg-primary-app rounded" :class="{ 'active': index === 0 }"
        :style="'background: ' + carousel_option.background + ' !important;'">
        <a :href="carousel_option.redirect_url" :target="carousel_option.is_blank_link ? '_blank' : ''">
          <img :src="carousel_option.image_url" class="d-block m-auto img-fluid w-100 rounded" alt="..." />
        </a>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselAutoplaying"
      data-bs-slide="prev">
      <span class="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselAutoplaying"
      data-bs-slide="next">
      <span class="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
