<script setup>

</script>

<template>
  <footer class="footer__container">
    <a
      class="footer__container__link"
      href="https://github.com/fontas-moraitis"
      target="_blank" rel="noopener"
    >
      <img class="footer__container__link__img" src="../assets/iconfinder-github.svg" alt="github-icon">
    </a>
    <a
      class="footer__container__link"
      href="https://www.linkedin.com/in/fontas-moraitis-34338819b/"
      target="_blank" rel="noopener"
    >
      <img class="footer__container__link__img" src="../assets/iconfinder-linkedin.svg" alt="linkedin-icon">
    </a>
  </footer>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';
    .footer__container {
      width: 30%;
      height: 200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__link {
        @include flex-center-center;
        @include shadow-button;
        width: $box-element;
        height: $box-element;
        border-radius: 10px;
        background: linear-gradient(145deg, #ffffff, #d7d6d6);
        padding: 2px 6px;
        &__img {
          width: $icon-button-size;
          height: $icon-button-size;
        }
        &:hover,
        &:focus-visible {
          cursor: url(../assets/circleEmpty.svg), auto;
        }
        &:focus-visible {
          border: 1px solid $color-shadow-dark;
        }
        &:active {
          @include shadow-in;
          background: #efeeee;
          img {
            transform: scale(0.8);
          }
        }
      }
    }

  @media only screen and (max-width: $mobile-breaking-point) {
      .footer__container {
        max-width: $small-width;
      }
    }
</style>