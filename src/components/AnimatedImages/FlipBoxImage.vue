<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter()

const showRandomQuote = () => {
  router.push({ name: 'all random' })
}
</script>

<template>
  <div class="flip-box" @click="showRandomQuote">
    <div class="flip-box__inner">
      <div class="flip-box__front">
        <img src="@/assets/images/image_nav_page.jpg">
      </div>
      <div class="flip-box__back">
        <img src="@/assets/images/image_nav_page.jpg">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flip-box {
  width: 330px;
  height: 500px;
  margin-top: 40px;
  margin-left: 40px;
  border-radius: 4px;
  transition: all 1s;
  transition-delay: .6s;
  cursor: pointer;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  img {
    transition: all 0.8s;
    transition-delay: .6s;
  }

  &:hover {
    .flip-box__inner {
      transform: rotateY(180deg);
    }

    img {
      border-radius: 50%;
    }
  }

  @media (max-width: 720px) {
    width: 40%;
    max-height: 380px;
    margin-left: 10px;

    &:hover {
      background-image: none;
      box-shadow: none;
    }
  }

  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 1s;
    transition-delay: .3s;
    transform-style: preserve-3d;
  }

  &__front, &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    img {
      height: 500px;
      width: auto;
      border-radius: 4px;
      filter: saturate(0.7);

      @media (max-width: 720px) {
        width: 100%;
        height: fit-content;
      }
    }
  }

  &__back {
    transform: rotateY(180deg);

    img {
      filter: saturate(1);
    }
  }
}
</style>