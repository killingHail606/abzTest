<script lang='ts' setup>
import Logo from '@/components/Logo.vue';
</script>

<template>
  <div class="header">
    <div class="header__nav">
      <div class="wrapper">
        <div class="header__nav-content">
          <div class="header__nav-logo">
            <Logo />
          </div>
          <div class="header__nav-buttons">
            <a
              href="#users"
              class="btn"
            >Users</a>
            <a
              href="#sign-up"
              class="btn"
            >Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.header {
  &__nav {
    background: #fff;
    height: 60px;
    display: flex;
    padding: 0 15px;
    &-content {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-buttons a {
      margin-left: 10px;
    }
  }
}

@media screen and (min-width: 1920px) {
  .header__nav {
    padding: 0;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .header__nav {
    padding: 0 32px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1920px) {
  .header__nav {
    padding: 0 60px;
  }
}
</style>
