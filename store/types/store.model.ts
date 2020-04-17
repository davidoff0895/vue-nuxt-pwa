interface StoreModel {
  categoriesList: ICategory[]
  currentCategory?: ICategory
}

interface ICategory {
  cName: string,
  cSlug: string,
  cImage: string
  cTitle: string
  cMetaDescription: string
}

export {
  StoreModel,
  ICategory
}
