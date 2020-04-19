<template>
  <div :class="$style.wrapper">
    <nuxt-link :to="`/product/${product.pSlug}`">
      <p>{{ product.pName }}</p>
      <img
        v-lazy="product.image"
        :class="$style.image"
      />
    </nuxt-link>
    <p>Цена {{ product.pPrice }}</p>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component({
    name: 'product-brief'
  })
  export default class ProductBrief extends Vue {
    @Prop(Object)
    protected product: any
  }
</script>

<style lang="scss" module>
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .image {
    width: 300px;
    height: 300px;
  }
</style>
