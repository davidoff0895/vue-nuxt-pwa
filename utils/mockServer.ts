import {ICategory, IProduct, IProductImage} from '@/store/types/store.model'

const sampleSize = require('lodash.samplesize')
const categories: ICategory[] = [
  {
    id: 'cats',
    cTitle: 'Cats',
    cName: 'Cats',
    cSlug: 'cats',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?cat,cats',
    products: []
  },
  {
    id: 'dogs',
    cTitle: 'Dogs',
    cName: 'Dogs',
    cSlug: 'dogs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?dog,dogs',
    products: []
  },
  {
    id: 'wolfs',
    cTitle: 'Wolfs',
    cName: 'Wolfs',
    cSlug: 'wolfs',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?wolf',
    products: []
  },
  {
    id: 'bulls',
    cTitle: 'Bulls',
    cName: 'Bulls',
    cSlug: 'bulls',
    cMetaDescription: 'Мета описание',
    cDesc: 'Описание',
    cImage: 'https://source.unsplash.com/300x300/?bull',
    products: []
  }
]
function getProductsByIds (products: IProduct[], productsImages: IProductImage[], ids: any[]) {
  const innerProducts = products.filter(p => p.id === ids.find(id => p.id === id))
  if (!innerProducts) return null
  return innerProducts.map(pr => {
    return {
      ...pr,
      category: categories.find(cat => cat.id === pr.category_id)
    }
  })
}
function getProduct (products: IProduct[], productsImages: IProductImage[], productSlug: string) {
  const innerProduct = products.find(p => p.pSlug === productSlug)
  if (!innerProduct) return null
  return {
    ...innerProduct,
    images: productsImages.find(img => img.id === innerProduct.id).urls,
    category: categories.find(cat => cat.id === innerProduct.category_id)
  }
}
function addProductsToCategory (products: IProduct[], productsImages: IProductImage[], category: ICategory) {
  const categoryInner: ICategory = { ...category, products: [] }
  products.map(p => {
    if (p.category_id === category.id) {
      categoryInner.products.push({
        id: p.id,
        pName: p.pName,
        pSlug: p.pSlug,
        pPrice: p.pPrice,
        image: productsImages.find(img => img.id === p.id).urls
      })
    }
  })
  return categoryInner
}
function getBreadcrumbs(pageType: any, route: any, data: any) {
  const crumbs = []
  crumbs.push({
    title: 'Main',
    url: '/'
  })
  switch (pageType) {
    case 'category':
      crumbs.push({
        title: data.pName,
        url: `/category/${data.pSlug}`
      })
      break
    case 'product':
      crumbs.push({
        title: data.category.cName,
        url: `/category/${data.category.cSlug}`
      })
      crumbs.push({
        title: data.pName,
        url: `/product/${data.pSlug}`
      })

      break

    default:
      break
  }
  return crumbs
}
export default { categories, sampleSize, getProductsByIds, getProduct, addProductsToCategory, getBreadcrumbs }
