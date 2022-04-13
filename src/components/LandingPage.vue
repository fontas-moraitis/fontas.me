<script setup>
import { onMounted, ref } from 'vue';
import gsap, { Expo, Bounce } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @description
 * The landing page includes a welcoming heading, the about me text and a ball that
 * follows the cursor around.
* @property {number} SPEED -- used in ball animation as multiplier for movement delay.
* @property {number} borderY -- indicates where the ball stops on Y axis, differs on desktop and mobile.
*/

const ball = ref(null);
const mainHead = ref(null);
const mainHeadMobile = ref(null);
const aboutMeHead = ref(null);
const aboutMeText = ref(null);
const scrollText = ref(null);
const scrollArrow = ref(null);

const SPEED = 0.08;
let borderY = 500;
let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;

const getMousePosition = () => {
  mouseX = event.pageX;
  mouseY = event.pageY;
}

const animateBall = () => {
  const HIDE_BALL_CLASS = 'landing-page__ball--hide';
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;

  ballX = ballX + (distX * SPEED);
  ballY = ballY + (distY * SPEED);

  let isBallNearXBorder = ball.value?.getBoundingClientRect().right + 200 >= window.innerWidth;
  let isBallNearYBorder = ball.value && ballY > borderY;
  let isBallOnCursor = Math.round(mouseX) === Math.round(ballX);

  if (isBallNearXBorder || isBallNearYBorder || isBallOnCursor) {
    ball.value.classList.add(HIDE_BALL_CLASS);
  } else {
    ball.value.classList.remove(HIDE_BALL_CLASS);
    ball.value.style.left = `${ballX + 12}px`; // 12px to compensate for custom cursor size 24x24
    ball.value.style.top = `${ballY + 12}px`;
    ball.value.style.opacity = `${(ballY / 1000).toPrecision(4)}`;
  }

  requestAnimationFrame(animateBall);
}

onMounted(() => {
  animateBall();

  gsap.to([mainHead.value, aboutMeHead.value, aboutMeText.value, scrollText.value], {
    opacity: 0,
    scrollTrigger: {
      trigger: mainHead.value,
      start: 'top top',
      scrub: 3,
      pin: true,
    }
  });

  gsap.from([mainHead?.value, mainHeadMobile?.value], 1.2, {
    y: -400,
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.from(aboutMeHead.value, 1.2, {
    delay: .4,
    y: '100vh',
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.from(aboutMeText.value, 1.2, {
    delay: .8,
    y: '100%',
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.from(scrollText.value, 1, {
    delay: 1,
    y: '200%',
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.to(scrollArrow.value, 1.2, {
    y: 10,
    yoyo: true,
    repeat: -1,
    ease: Bounce.out,
  });
});
</script>

<template>
  <div 
    class="landing-page"
    @mousemove="getMousePosition"
  >
    <div ref="ball" class="landing-page__ball" />
    <p ref="mainHead" class="landing-page__heading">
      {{ $t('hello') }}
    </p>
    <p ref="mainHeadMobile" class="landing-page__heading-mobile">
      {{ $t('hi') }}
    </p>
    <div class="landing-page__about-me">
      <h1 ref="aboutMeHead" class="landing-page__about-me__heading">
        {{ $t('aboutMeHeading') }}
      </h1>
      <p ref="aboutMeText" class="landing-page__about-me__text">
        {{ $t('aboutMeText') }}
      </p>
    </div>
    <div ref="scrollText" class="landing-page__scroll-down">
      <p>{{ $t('scrollDown') }}</p>
      <svg ref="scrollArrow" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
        <polyline points="16 10 12 14 8.05 10" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';
  .landing-page {
    height: 100vh;
    max-width: 100vw;
    padding: 24px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__ball {
      width: 30vmin;
      height: 30vmin;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%) scale(1);
      background-color: $color-highlight;
      mix-blend-mode: darken;
      transition: transform 800ms ease-in-out;
      &--hide {
        transform: translate(-50%, -50%) scale(0);
        transition: transform 800ms ease-in-out;
      }
    }
    &__heading,
    &__heading-mobile {
      font-size: 200px;
      margin-bottom: 8px;
    }
    &__heading-mobile {
      display: none;
    }
    &__about-me {
      margin-right: 5%;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      overflow: hidden;
      &__heading {
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 12px;
        width: 60vmin;
      }
      &__text {
        width: 60vmin;
        line-height: 22px;
      }
    }
    &__scroll-down {
      position: relative;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
    }
  }

@media only screen and (max-width: $mobile-breaking-point) {
    .landing-page {
      height: calc(100vh - 100px);
      padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    &__ball {
      display: none;
    }
    &__heading {
      display: none;
    }
    &__heading-mobile {
      display: block;
    }
  }
}

@media screen and (device-width: 390px) and (orientation: landscape) {
  .landing-page {
    height: 100vh;
    &__heading-mobile {
      font-size: 180px;
    }
    &__about-me__heading,
    &__about-me__text {
      width: 50vw;
    }
    &__scroll-down {
      display: none;
    }
  }
}
</style>