<template>
  <div>
    <h1>Интернет-магазин "Хвостики"</h1>
    <categories-list :categories="categories"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import CategoriesList from '@/components/commons/CategoriesList.vue'
  import {Getter} from 'vuex-class'
  import {StoreModel} from '@/store/types/store.model'

  @Component({
    name: 'root-component',
    components: {CategoriesList},
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
  })
  export default class RootComponent extends Vue {
    @Getter('categoriesList')
    protected categories!: StoreModel['categoriesList']
  }
</script>
