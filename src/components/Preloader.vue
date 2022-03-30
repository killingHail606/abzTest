<script lang='ts' setup>

</script>

<template>
  <img
    class="preloader"
    :src="'/img/preloader.svg'"
    alt="Загрузка"
  >
</template>

<style lang='scss' scoped>
@keyframes rotate360 {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.preloader {
  animation: rotate360 1.5s infinite;
}
</style>
