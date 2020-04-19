import Vue from 'vue'
import Vuex from 'vuex'
import mockServer from '@/utils/mockServer'
import {ICategory, IProduct, StoreModel} from '@/store/types/store.model'

Vue.use(Vuex)

const sleep = (m: any) => new Promise(r => setTimeout(r, m))
const categories: ICategory[] = [
  {
    id: 'cats',
    cTitle: 'Котики',
    cName: 'Котики',
    cSlug: 'cats',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?cat,cats',
    products: []

  },
  {
    id: 'dogs',
    cTitle: 'Собачки',
    cName: 'Собачки',
    cSlug: 'dogs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?dog,dogs',
    products: []
  },
  {
    id: 'wolfs',
    cTitle: 'Волчки',
    cName: 'Волчки',
    cSlug: 'wolfs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?wolf',
    products: []
  },
  {
    id: 'bulls',
    cTitle: 'Бычки',
    cName: 'Бычки',
    cSlug: 'bulls',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?bull',
    products: []
  }
]

const addProductsToCategory = (products: IProduct[], category: ICategory) => {
  const categoryInner: ICategory = {...category, products: []}
  products.map(p => {
    if (p.category_id === category.id) {
      categoryInner.products.push({
        id: p.id,
        pName: p.pName,
        pSlug: p.pSlug,
        pPrice: p.pPrice,
        image: `https://source.unsplash.com/300x300/?${p.pName}`
      })
    }
  })
  return categoryInner
}

const store = () => new Vuex.Store({
  state(): StoreModel {
    return {
      categoriesList: [],
      currentCategory: null,
      currentProduct: null
    }
  },
  getters: {
    categoriesList: (state: StoreModel) => state.categoriesList,
    category: (state: StoreModel) => state.currentCategory,
    currentProduct: (state: StoreModel) => state.currentProduct
  },
  actions: {
    async getCategoriesList({commit}: any) {
      try {
        await sleep(1000)
        await commit('SET_CATEGORIES_LIST', categories)
      } catch (err) {
        console.log(err)
        throw new Error('Внутреняя ошибка сервера, сообщите администратору')
      }
    },
    async getCurrentCategory({ commit }, { route }) {
      await sleep(1000)
      const category = categories.find((cat) => cat.cSlug === route.params.CategorySlug)
      const [products, productsImages] = await Promise.all(
        [
          // @ts-ignore
          this.$axios.$get('/mock/products.json'),
          // @ts-ignore
          this.$axios.$get('/mock/products-images.json')
        ]
      )
      await commit('SET_CURRENT_CATEGORY', addProductsToCategory(products, category))
    },
    async getCurrentProduct ({ commit, dispatch }, { route }) {
      await sleep(50)
      const productSlug = route.params.ProductSlug
      const [products, productsImages, alsoBuyProducts, interestingProducts] = await Promise.all(
        [
          // @ts-ignore
          this.$axios.$get('/mock/products.json'),
          // @ts-ignore
          this.$axios.$get('/mock/products-images.json'),
          dispatch('getProductsListRandom'),
          dispatch('getProductsListRandom')
        ]

      )
      const product = mockServer.getProduct(products, productsImages, productSlug)
      const crubms = mockServer.getBreadcrumbs('product', route, product)
      await dispatch('setBreadcrumbs', crubms)
      await commit('SET_CURRENT_PRODUCT', { ...product, alsoBuyProducts, interestingProducts })
    },
    async getProductsListRandom ({ commit }) {
      await sleep(50)
      const [products, productsImages] = await Promise.all(
        [
          // @ts-ignore
          this.$axios.$get('/mock/products.json'),
          // @ts-ignore
          this.$axios.$get('/mock/products-images.json'),
        ]

      )
      const idsArray = (mockServer.sampleSize(products, 5)).map((p: { id: string }) => p.id)
      return mockServer.getProductsByIds(products, productsImages, idsArray)
    },
  },
  mutations: {
    SET_CATEGORIES_LIST (state: StoreModel, categories: ICategory[]) {
      state.categoriesList = categories
    },
    SET_CURRENT_CATEGORY (state: StoreModel, category: ICategory) {
      state.currentCategory = category
    },
    SET_CURRENT_PRODUCT (state: StoreModel, product) {
      state.currentProduct = product
    }
  }
})

export default store
