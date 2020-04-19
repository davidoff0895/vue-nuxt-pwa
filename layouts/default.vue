<template>
  <div>
    <header-component />
    <nuxt />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import HeaderComponent from '@/components/common/Header.vue'

  @Component({
    name: 'default-page',
    components: {HeaderComponent},
  })
  export default class DefaultPage extends Vue {
    get meta () {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Главная'
        }
      ]
    }

    protected head () {
      const canonical = `https://mysite.com${this.$route.path
        .toLowerCase()
        .replace(/\/$/, '')}`
      return {
        meta: [
          ...this.meta

        ],
        // script: [
        //   { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
        // ],
        link: [{ rel: 'canonical', href: canonical }]
      }
    }
  }
</script>
<style lang="scss" module>
  .mainWrapper {

  }
</style>
