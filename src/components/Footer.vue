<script setup>

</script>

<template>
  <footer class="footer__container">
    <a class="footer__container__link" href="https://github.com/fontas-moraitis" target="_blank" rel="noopener">
      <img class="footer__container__link__img" src="../assets/iconfinder-github.svg" alt="github-icon">
    </a>
    <a class="footer__container__link" href="https://www.linkedin.com/in/fontas-moraitis-34338819b/" target="_blank"
      rel="noopener">
      <img class="footer__container__link__img" src="../assets/iconfinder-linkedin.svg" alt="linkedin-icon">
    </a>
  </footer>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.footer__container {
  height: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &__link {
    @include flex-center-center;
    @include shadow-button;
    width: $box-element;
    height: $box-element;
    border-radius: 10px;
    background: var(--social-bg-gradient);
    padding: 2px 6px;

    &:first-of-type {
      margin-right: 20px;
    }

    &__img {
      width: $icon-button-size;
      height: $icon-button-size;
    }

    @media (prefers-color-scheme: dark) {
      &__img {
        filter: invert(70%);
      }
    }

    &:hover,
    &:focus-visible {
      cursor: url(../assets/link.svg), auto;
    }

    &:focus-visible {
      border: 1px solid var(--color-shadow-dark);
    }

    &:active {
      @include shadow-in;

      img {
        transform: scale(0.8);
      }
    }
  }
}
</style>
