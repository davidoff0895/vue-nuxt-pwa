interface StoreModel {
  categoriesList: ICategory[]
  currentCategory?: ICategory
  currentProduct: IProduct
}

interface ICategory {
  id: string,
  cName: string,
  cSlug: string,
  cImage: string
  cTitle: string
  cMetaDescription: string
  cDesc: string
  products: IProduct[]
}

interface IProduct {
  id: string
  pName: string
  pSlug: string
  pPrice: number
  image: string
  category_id?: string
  images?: IProductImage
  pDesc?: string
  pMetaDescription?: string
  pTitle?: string
}

interface IProductImage {
  id: string
  imgXL: string
  imgL: string
  urls: string
}

export {
  StoreModel,
  ICategory,
  IProduct,
  IProductImage
}
