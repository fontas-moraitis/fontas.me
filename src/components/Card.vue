<script setup>
let props = defineProps({
  cardWidth: Number,
  item: Object
});
</script>

<template>
  <div :style="{ width: props.cardWidth - 48 + 'px' }" class="card">
    <div class="card__logo">
      {{ props.item.logo }}
    </div>
    <div class="card__text">
      <span class="card__text__title">
        {{ props.item.name }}
      </span>
      <span class="card__text__description">
        {{ props.item.description }}
      </span>
    </div>
    <div v-if="props.item.live || props.item.github" class="card__buttons">
      <a v-if="props.item.github" class="card__buttons__link" :href="props.item.github" target="_blank" rel="noopener">
        {{ $t('sourceCode') }}
      </a>
      <a v-if="props.item.live" class="card__buttons__link" :href="props.item.live" target="_blank" rel="noopener">
        {{ $t('visitLive') }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.card {
  @include shadow-out;
  @include flex-column-center;

  height: $card-total-height;
  justify-content: space-between;
  color: var(--color-text-grey);
  flex-shrink: 0;
  flex-grow: 0;
  padding: $size-medium;
  margin: $size-medium;
  border-radius: $size-xsmall;
  position: relative;

  &:after {
    content: "";
    height: 70px;
    width: 1px;
    position: absolute;
    left: -1px;
    top: 65%;
    transition: top, opacity;
    transition-duration: 800ms;
    transition-timing-function: ease;
    background: linear-gradient(transparent,
        var(--color-glare),
        transparent);
    opacity: 0;
    top: 65%;
    opacity: 0;
  }

  &:hover:after {
    top: 25%;
    opacity: 1;
    transition: all 300ms ease-in-out;
  }


  &__logo {
    @include shadow-in;

    width: $card-logo-container-size;
    height: $card-logo-container-size;
    border-radius: 50%;
    display: grid;
    place-content: center;
    font-size: $large-text;
  }

  &__text {
    @include flex-column-center;

    &__title {
      font-weight: $bold-text;
      color: var(--color-text-dark);
      margin-bottom: $size-small;
      text-transform: uppercase;
      white-space: nowrap;
    }

    &__description {
      max-width: 80%;
      text-align: center;
      font-family: 'Slabo 27px', serif;
      font-size: $fine-text;
      color: var(--color-text-grey-light);
      line-height: 1.5;
      font-weight: $medium-text;
    }
  }

  &__buttons {
    @include flex-column-center;

    &__link {
      @include flex-center-center;
      width: 200%;
      height: $card-button-height;
      padding: $card-button-padding;
      margin-bottom: 2px;
      white-space: nowrap;
      font-size: $fine-text;
      border-radius: 4px;
      color: var(--color-text-dark);

      &:hover {
        @include shadow-in;
        cursor: url(../assets/link.svg), auto;
      }

      &:focus-visible {
        border: 2px solid var(--color-highlight);
        outline: none;
      }

      &__img {
        margin-left: $size-xxsmall;
      }
    }
  }
}

@media only screen and (max-width: $mobile-breaking-point) {
  .card {
    @include shadow-out-mobile;

    display: flex;
    margin: $size-medium;
    height: $card-total-height-mobile;
    padding: $size-xsmall;

    &__logo {
      width: $box-element;
      height: $box-element;
      font-size: $fine-text;
      flex-shrink: 0;
    }

    &__text {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: $size-small;

      &__title {
        margin: 0;
        writing-mode: vertical-lr;
        transform: rotate(-180deg);
        font-size: $mobile-text;
        white-space: nowrap;
      }

      &__description {
        display: none;
      }
    }

    &__buttons {

      &__link {
        width: auto;
        height: auto;
        writing-mode: vertical-lr;
        transform: rotate(-180deg);
        font-size: $mobile-text;
        border: none;
        box-shadow: none;
        text-decoration: underline;

        &__img {
          display: none;
        }
      }
    }
  }
}
</style>