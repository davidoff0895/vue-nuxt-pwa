<template>
  <div>
    <h1>Интернет-магазин "Хвостики"</h1>
    <categories-list :categories="categories" />
  </div>
</template>

<!--<script lang="ts">-->
<!--  import Vue from 'vue'-->
<!--  import {Component} from 'vue-property-decorator'-->
<!--  import { Getter, Action } from 'vuex-class'-->
<!--  import CategoriesList from '@/components/commons/CategoriesList.vue'-->
<!--  import {StoreModel} from '@/store/types/store.model'-->

<!--  @Component({-->
<!--    name: 'root',-->
<!--    components: {CategoriesList}-->
<!--  })-->
<!--  export default class Root extends Vue {-->
<!--    @Getter(`categoriesList`)-->
<!--    protected categories: StoreModel['categoriesList'] | undefined-->

<!--    @Action('getCategoriesList')-->
<!--    protected getCategoriesList: any-->

<!--    async asyncData ({ app, route, params, error, store }: any) {-->
<!--      try {-->
<!--        await this.getCategoriesList()-->
<!--      } catch (err) {-->
<!--        console.log(err)-->
<!--        return error({-->
<!--          statusCode: 404,-->
<!--          message: 'Категории не найдены или сервер не доступен'-->
<!--        })-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<script>
  import CategoriesList from '@/components/commons/CategoriesList.vue'
  import { mapState } from 'vuex'
  export default {
    components: {
      CategoriesList
    },
    async asyncData ({ app, route, params, error, store }) {
      try {
        await store.dispatch('getCategoriesList')
      } catch (err) {
        console.log(err)
        return error({
          statusCode: 404,
          message: 'Категории не найдены или сервер не доступен'
        })
      }
    },
    computed: {
      ...mapState({
        categories: 'categoriesList'
      })
    }
  }
</script>
