<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import LandingPage from './components/LandingPage.vue';
import ProjectGallery from './components/ProjectGallery.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="content-wrapper">
    <LandingPage />
    <ProjectGallery />
    <Footer />
  </div>
</template>

<style lang="scss">
@import './styles/_reset.css';
@import './styles/variables';

#app {
  cursor: url(./assets/circle.svg), auto;
  background: $color-background-gradient;

}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
