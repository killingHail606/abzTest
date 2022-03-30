<script lang='ts' setup>

</script>

<template>
  <router-link
    to="index"
    class="logo"
  >
    <img
      class="logo-img"
      :src="'/img/logo.svg'"
      alt="Загрузка"
    >
    <span>TestTask</span>
  </router-link>
</template>

<style lang='scss' scoped>
.logo {
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  span {
    text-transform: uppercase;
  }
}
</style>
