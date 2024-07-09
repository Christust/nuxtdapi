<template>
  <div
    id="carouselExampleAutoplaying"
    class="carousel slide rounded mb-3"
    data-bs-ride="carousel"
    v-if="banner_options.length > 0"
  >
    <div class="carousel-inner">
      <div
        v-for="(banner_option, index) in banner_options"
        :key="'BANNER_OPTIONS' + index"
        class="carousel-item bg-primary-app rounded"
        :class="{ 'active': index === 0 }"
        :style="'background: ' + banner_option.background + ' !important;'"
      >
        <a :href="banner_option.redirect_url" :target="banner_option.is_blank_link ? '_blank' : ''">
          <img
            :src="banner_option.image_url"
            class="d-block m-auto img-fluid w-100 rounded"
            alt="..."
          />
        </a>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  banner_options: { type: Array, required: false, default: () => [] }
})

const { banner_options } = toRefs(props)
</script>
