<template>
  <div>
    <h1>{{ category.cName }}</h1>
    <p>{{ category.cDesc }}</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import {State, Getter, Action} from 'vuex-class'
  import {StoreModel} from '@/store/types/store.model'

  @Component({
    name: 'category-slug',
    async asyncData ({ app, params, route, error }: any) {
      try {
        await app.store.dispatch('getCurrentCategory', { route })
      } catch (err) {
        console.log(err)
        return error({
          statusCode: 404,
          message: 'Категория не найдена или сервер не доступен'
        })
      }
    },
    head () {
      return {
        title: this.category.cTitle,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.category.cMetaDescription
          }
        ]
      }
    }
  })
  export default class CategorySlug extends Vue {
    @Getter('category')
    category!: StoreModel['currentCategory']
  }

</script>
