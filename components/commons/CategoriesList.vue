<template>
  <div>
    <h2>Список категорий</h2>
    <div :class="$style.wrapper">
      <div
        v-for="category in categories"
        :key="category.cSlug"
        :class="$style.block"
      >
        <nuxt-link :to="`/category/${category.cSlug}`">
          <p>{{ category.cName }}</p>
          <img :src="category.cImage" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import {ICategory} from '@/store/types/store.model'

  @Component({
    name: 'categories-list',
  })
  export default class CategoriesList extends Vue {
    @Prop(Array)
    protected categories: ICategory[] | undefined
  }
</script>

<style lang="scss" module>
  .wrapper {
    display: flex;
  }
  .block {
    display: flex;
    flex-direction: column;
  }
</style>
