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

const HIDE_BALL_CLASS = 'landing-page__ball--hide';
const ball = ref(null);
const mainHead = ref(null);
const mainHeadMobile = ref(null);
const aboutMeHead = ref(null);
const aboutMeText = ref(null);
const scrollText = ref(null);
const scrollArrow = ref(null);

const SPEED = 0.08;
const CURSOR_OFFSET = 12; // 12px to compensate for custom cursor size 24x24

let borderY = 500;
let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;

const getMousePosition = (event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
}

const animateBall = () => {
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;

  ballX = ballX + (distX * SPEED);
  ballY = ballY + (distY * SPEED);

  let isBallNearXBorder = ball.value && ballX >= window.innerWidth - 140; // add 140px safe zone to prevent overflow
  let isBallNearYBorder = ball.value && ballY > borderY;
  let isBallOnCursor = Math.round(mouseX) === Math.round(ballX);

  if (isBallNearXBorder || isBallNearYBorder || isBallOnCursor) {
    ball.value?.classList.add(HIDE_BALL_CLASS);
  } else {
    ball.value?.classList.remove(HIDE_BALL_CLASS);
    ball.value.style.left = `${ballX + CURSOR_OFFSET}px`;
    ball.value.style.top = `${ballY + CURSOR_OFFSET}px`;
    ball.value.style.opacity = `${(ballY / 1000).toPrecision(4)}`;
  }

  requestAnimationFrame(animateBall);
}

onMounted(() => {
  ball.value.classList.add(HIDE_BALL_CLASS);

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

  gsap.from([mainHead?.value, mainHeadMobile?.value], {
    duration: 2,
    y: -400,
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.from(aboutMeHead.value, {
    duration: 2,
    delay: .4,
    y: '100vh',
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.from(aboutMeText.value, {
    duration: 4,
    delay: .2,
    y: '150%',
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.from(scrollText.value, {
    duration: 1,
    delay: 1.5,
    y: '200%',
    opacity: 0,
    ease: Expo.easeInOut,
  });

  gsap.to(scrollArrow.value, {
    duration: 2.3,
    y: 10,
    yoyo: true,
    repeat: -1,
    ease: Bounce.out,
  });
});
</script>

<template>
  <div class="landing-page" @mousemove="($event) => getMousePosition($event)">
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
        <polyline points="16 10 12 14 8.05 10" stroke="currentcolor" stroke-width="1" stroke-linecap="round"
          stroke-linejoin="round" fill="none" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

.landing-page {
  min-height: 100svh;
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
    background-color: var(--color-highlight);
    // mix-blend-mode: darken;
    transition: transform 800ms ease-in-out;

    &--hide {
      transform: translate(-50%, -50%) scale(0);
      transition: transform 800ms ease-in-out;
    }
  }

  &__heading,
  &__heading-mobile {
    font-size: 200px;
    line-height: 1;
  }

  &__heading-mobile {
    display: none;
  }

  &__about-me {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;

    &__heading,
    &__text {
      width: 64vmin;
    }

    &__heading {
      font-size: 22px;
      font-weight: 550;
      margin-bottom: 6px;
    }

    &__text {
      text-wrap: balance;
      font-size: 14px;
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
    height: 100svh;

    &__heading-mobile {
      font-size: 160px;
    }

    &__about-me__heading,
    &__about-me__text {
      min-width: 50vw;
    }

    &__scroll-down {
      display: none;
    }
  }
}
</style>