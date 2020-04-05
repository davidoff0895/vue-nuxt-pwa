<template>
  <div>
    <h1>Привет Хабр!</h1>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'

  @Component({
    name: 'root'
  })
  export default class Root extends Vue {

  }
</script>

<style lang="scss" scoped>

</style>
