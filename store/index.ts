import Vue from 'vue'
import {StoreOptions} from 'vuex'
import Vuex from 'vuex'
import {ICategory, StoreModel} from '@/store/types/store.model'

Vue.use(Vuex)

const sleep = (m: any) => new Promise(r => setTimeout(r, m))
const categories = [
  {
    cName: 'Котики',
    cSlug: 'cats',
    cImage: 'https://source.unsplash.com/300x300/?cat,cats'
  },
  {
    cName: 'Собачки',
    cSlug: 'dogs',
    cImage: 'https://source.unsplash.com/300x300/?dog,dogs'
  },
  {
    cName: 'Волчки',
    cSlug: 'wolfs',
    cImage: 'https://source.unsplash.com/300x300/?wolf'
  },
  {
    cName: 'Бычки',
    cSlug: 'bulls',
    cImage: 'https://source.unsplash.com/300x300/?ox'
  }
]

const store = () => new Vuex.Store({
  state(): StoreModel {
    return {
      categoriesList: [],
      currentCategory: null
    }
  },
  getters: {
    categoriesList: (state: StoreModel) => state.categoriesList,
    category: (state: StoreModel) => state.currentCategory
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
      await commit('SET_CURRENT_CATEGORY', category)
    }
  },
  mutations: {
    SET_CATEGORIES_LIST (state: StoreModel, categories: ICategory[]) {
      state.categoriesList = categories
    },
    SET_CURRENT_CATEGORY (state: StoreModel, category: ICategory) {
      state.currentCategory = category
    }
  }
})

export default store
