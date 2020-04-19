<template>
  <div>
    <h1>{{ category.cName }}</h1>
    <p>{{ category.cDesc }}</p>
    <div :class="$style.productList">
      <div
        v-for="product in category.products"
        :key="product.id"
      >
        <product-brief :product="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {Getter} from 'vuex-class'
  import {StoreModel} from '@/store/types/store.model'
  import ProductBrief from '@/components/category/ProductBrief.vue'

  @Component({
    name: 'category-slug',
    components: {ProductBrief},
  })
  export default class CategorySlug extends Vue {
    @Getter('category')
    protected category!: StoreModel['currentCategory']

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
    }

    head() {
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
  }
</script>

<style lang="scss" module>
  .productList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
