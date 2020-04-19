<template>
  <div :class="$style.page">
    <h1>Интернет-магазин "Хвостики"</h1>
    <categories-list :categories="categories"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import CategoriesList from '@/components/common/CategoriesList.vue'
  import {Getter} from 'vuex-class'
  import {StoreModel} from '@/store/types/store.model'

  @Component({
    name: 'root-component',
    components: {CategoriesList},
  })
  export default class RootComponent extends Vue {
    @Getter('categoriesList')
    protected categories!: StoreModel['categoriesList']

    async asyncData({app, route, params, error, store}: any) {
      try {
        await store.dispatch('getCategoriesList')
      } catch (err) {
        console.log(err)
        return error({
          statusCode: 404,
          message: 'Категории не найдены или сервер не доступен'
        })
      }
    }
  }
</script>

<style lang="scss" module>
  .page {
    @include globalWrapper;
  }
</style>
