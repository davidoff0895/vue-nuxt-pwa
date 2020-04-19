<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <n-link :class="$style.logo" to="/">
        <p>
          Хвостики
        </p>
      </n-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  @Component({
    name: 'header-component'
  })
  export default class HeaderComponent extends Vue {

  }
</script>

<style lang="scss" module>
  .wrapper {
    background-color: $basic-bg-color;
    height: 70px;
  }
  .header {
    @include globalWrapper;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    font-size: 2.2em;
    font-weight: 700;
    opacity: 1;
     color: #000;
     text-decoration: none;
  }
</style>
