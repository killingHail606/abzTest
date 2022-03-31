<script lang='ts' setup>

</script>

<template>
  <div class="index-page-main wrapper">
    <div class="index-page-main__content">
      <h1>Test assignment for front-end developer</h1>
      <p>
        What defines a good front-end developer is one that has skilled knowledge of HTML,
        CSS, JS with a vast understanding of User design thinking as they'll be building web
        interfaces with accessibility in mind. They should also be excited to learn, as
        the world of Front-End Development keeps evolving.
      </p>
      <a
        href="#sign-up"
        class="btn"
      >Sign up</a>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.index-page-main {
  background: url("/img/index-bg.png") center;
  background-size: cover;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;

  &__content {
    max-width: 390px;
    color: white;
    text-align: center;

    p {
      margin: 15px 0 30px 0;
    }
  }
}

@media screen and (min-width: 1024px) {
  .index-page-main {
    min-height: 650px;
  }
}
</style>
