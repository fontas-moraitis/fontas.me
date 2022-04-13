<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from '../data/projects'
import Card from './Card.vue';

gsap.registerPlugin(ScrollTrigger);

/**
* @description
* Generates cards from projects and dynamically calculates cardWidth based on screen size
* @property {Number} VISIBLE_CARD_NUMBER -- determines the number of cards displayed in view
* @property {Array} projects -- array of objects to populate card structure:
* @example
* {
    name: name of project,
    description: description of project,
    github: link to github page,
    live: link to website,
    logo: number or logo for card
}
*/

const VISIBLE_CARD_NUMBER = 3
const state = reactive({ cardWidt: 0, calcMargin: 0 });
const cardholder = ref(null);
const galleryIntro = ref(null);

let cardHolderWidth = 0;


onMounted(() => {
  resizeHandler();
  window.addEventListener('resize', resizeHandler);
  document.addEventListener('keydown', event => keyboardNav(event));

  gsap.from(galleryIntro.value, 1, {
    x: '-30%',
    opacity: 0.5,
    scrollTrigger: {
      trigger: galleryIntro.value,
      start: 'top bottom',
      scrub: true,
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
});

const resizeHandler = () => {
  cardHolderWidth = cardholder.value?.offsetWidth;
  state.cardWidth = Math.ceil(cardHolderWidth / VISIBLE_CARD_NUMBER);
};

const next = () => {
  state.calcMargin >= (-state.cardWidth) * (projects.length - (VISIBLE_CARD_NUMBER + 1))
    ? state.calcMargin -= state.cardWidth
    : state.calcMargin = 0;
}

const previous = () => {
  state.calcMargin <= (-state.cardWidth)
    ? state.calcMargin += state.cardWidth
    : state.calcMargin = (-state.cardWidth) * (projects.length - (VISIBLE_CARD_NUMBER)) || (-state.cardWidth);
}

const keyboardNav = (e) => {
  if (e.key === 'ArrowLeft') previous();
  if (e.key === 'ArrowRight') next();
}

</script>

<template>
  <main class="gallery">
    <div ref="galleryIntro" class="gallery__intro">
      <span>{{ $t('galleryTitle') }}</span>
      <div class="nav-guide">
        <span>{{ $t('gallerySubtitle')}}</span>
        <span class="nav-guide__left">
          <svg data-v-cd28a988="" xmlns="http://www.w3.org/2000/svg" width="20" height="auto" viewBox="0 0 24 24">
            <path data-v-cd28a988="" d="M15,16.27,9,12l6-4.27Z" stroke="#2C2C2C" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" fill="#9E9E9E"/>
          </svg>
        </span>
        <span class="nav-guide__right">
          <svg data-v-cd28a988="" xmlns="http://www.w3.org/2000/svg" width="20" height="auto" viewBox="0 0 24 24">
            <path data-v-cd28a988="" d="M9,7.73,15,12,9,16.27Z" stroke="#2C2C2C" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" fill="#9E9E9E"/>
          </svg>
        </span>
      </div>
      <div class="nav-guide--mobile">{{ $t('gallerySubtitleMobile')}}</div>
    </div>
    <div
     ref="cardholder"
     class="gallery__cardholder"
    >
      <div
        :style="{ marginLeft: state.calcMargin + 'px' }"
        class="gallery__cardholder__carousel"
      >
        <Card
          v-for="(item, index) in projects"
          :key="index"
          :item="item"
          :cardWidth="state.cardWidth"
        />
      </div>
    </div>
    <section class="gallery__btn-holder">
      <button
        aria-label="button previous"
        class="gallery__btn-holder__btn"
        type="button"
        name="previous card"
        title="previous card"
        @click="previous"
      >
        <img class="gallery__btn-holder__btn__img" src="../assets/arrow-left.svg" alt="previous card" />
      </button>
      <button
        aria-label="button next"
        class="gallery__btn-holder__btn"
        type="button"
        name="next card"
        title="next card"
        @click="next"
      >
          <img class="gallery__btn-holder__btn__img" src="../assets/arrow-right.svg" alt="next card" />
      </button>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
@import '../styles/mixins';

.gallery {
    &__intro {
      margin-bottom: $size-xlarge;
      font-size: $standar-text;
      font-weight: $xbold-text;
      .nav-guide {
        font-weight: $thin-text;
        font-size: $size-small;
        color: #9E9E9E;
        &__left,
        &__right {
          border: 1px solid #9E9E9E;
          border-radius: 4px;
          padding: 0 8px;
          margin-left: 8px;
          svg {
            transform: translateY(28%);
            transform-origin: bottom center;
          }
        }
      }
      .nav-guide--mobile {
        display: none;
      }
    }
    &__cardholder {
      overflow: hidden;
      &::-webkit-scrollbar {
        width: 0px;
      }
      &__carousel {
        height: $gallery-height;
        display: flex;
        margin: 0;
        transition: all 1000ms ease;
      }
    }
    &__btn-holder {
      margin: $size-small 0 $size-medium 0;
      display: flex;
      justify-content: center;
      &__btn {
        @include shadow-out;
        width: $box-element;
        height: $box-element;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $color-border-highlight;
        outline: none;
        border-radius: 8px;
        margin: $size-small;
        &__img {
          width: $icon-button-size;
          height: $icon-button-size;
        }
        &:hover {
          cursor: url(../assets/circleEmpty.svg), auto;
        }
        &:focus-visible {
          border: 2px solid black ;
        }
        &:active {
          @include shadow-in;
          border: none;
          outline: none;
          cursor: url(../assets/circleEmpty.svg), auto;
          img {
            transform: scale(0.8);
          }
        }
      }
    }
  }

@media only screen 
    and (device-width: 390px) 
    and (device-height: 844px) 
    and (-webkit-device-pixel-ratio: 3) {
    .gallery {
      margin-top: $size-medium;
      padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
      &__cardholder {
        overflow-x: scroll;
        height: $gallery-height-mobile;
      }
      &__intro {
        margin: 0 0 $size-small 0;
        padding: $size-small;
        .nav-guide--mobile {
        display: block;
        font-size: $size-xsmall;
        margin-top: $size-xxsmall;
        }
        .nav-guide {
          display: none;
        }
      }
      &__btn-holder {
        display: none;
      }
    }
  }
</style>