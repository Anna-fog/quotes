<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="header__content container">
      <RouterLink to="/">
        <img src="../assets/images/circle.svg" class="header__logo" alt="circle">
      </RouterLink>
    </div>
  </header>
</template>


<style scoped lang="scss">
.header {
  width: 100vw;
  background-color: var(--rolling-stone);

  &__content {
    display: flex;
    align-items: center;
    height: 60px;
    margin: 0 auto;
  }

  &__logo {
    cursor: pointer;
  }
}
</style>