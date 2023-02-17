<script setup lang="ts"></script>

<template>
  <img
    src="@/assets/images/tumbleweed.png"
    class="tumbleweed"
    alt="">
</template>

<style lang="scss" scoped>
.tumbleweed {
  position: absolute;
  left: -100px;
  bottom: 0;
  width: 100px;
  height: auto;
  animation: wind ease-in-out 5s;
}

@keyframes wind {
  0% {
    left: -100px;
    transform: rotate(0);
  }
  99% {
    display: block;
  }
  100% {
    left: calc(100% + 100px);
    transform: rotate(380deg);
    display: none;
  }
}
</style>