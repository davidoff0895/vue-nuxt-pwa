interface StoreModel {
  categoriesList: ICategory[]
}

interface ICategory {
  cName: string,
  cSlug: string,
  cImage: string
}

export {
  StoreModel,
  ICategory
}
