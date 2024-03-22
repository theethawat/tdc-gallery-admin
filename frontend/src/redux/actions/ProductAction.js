import GeneralAction from './GeneralAction'
import { PRODUCT_ALL, PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_EDIT, PRODUCT_ERROR, PRODUCT_GET } from '../type'

const ProductAction = new GeneralAction('product', 'Product', {
  allConst: PRODUCT_ALL,
  oneConst: PRODUCT_GET,
  errorConst: PRODUCT_ERROR,
  createConst: PRODUCT_CREATE,
  updateConst: PRODUCT_EDIT,
  deleteConst: PRODUCT_DELETE,
})

export const getAllProduct = (query) => ProductAction.getAllData(query)
export const getOneProduct = (id) => ProductAction.getOneData(id)
export const createOneProduct = (data) => ProductAction.createOne(data)
export const updateOneProduct = (id, payload) => ProductAction.editOne(id, payload)
export const deleteOneProduct = (id) => ProductAction.deleteOne(id)
