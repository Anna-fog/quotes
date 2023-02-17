<script setup lang="ts"></script>

<template>
  <img
    src="@/assets/images/oak-leaf.svg"
    class="oak-leaf"
    alt="">
</template>

<style lang="scss" scoped>
.oak-leaf {
  position: absolute;
  left: -100px;
  bottom: 20px;
  width: 100px;
  height: auto;
  animation: wind ease-in-out 5s;
}

@keyframes wind {
  0% {
    left: -100px;
    transform: rotate(90deg);
  }
  25% {
    bottom: 120px;
  }
  45% {
    bottom: 10px;
  }
  65% {
    transform: rotate(390deg);
  }
  99% {
    display: block;
    bottom: 220px;
  }
  100% {
    transform: rotate(340deg);
    left: calc(100% + 100px);
    display: none;
  }
}

@keyframes fast-wind {
  0% {
    left: -70px;
    transform: rotate(120deg);
  }
  25% {
    bottom: 120px;
  }
  35% {
    left: 50%;
  }
  45% {
    bottom: 20px;
  }
  55% {
    bottom: 50px;
    transform: rotate(570deg);
    left: 40%;
  }
  65% {
    bottom: 10px;
  }
  80% {
    transform: rotate(540deg);
    bottom: 100px;
  }
  99% {
    display: block;
    transform: rotate(570deg);
  }
  100% {
    left: calc(100% + 70px);
    display: none;
  }
}
</style>