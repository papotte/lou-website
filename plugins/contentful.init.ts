import { Store } from 'vuex'
import { StoreType } from '~/store/StoreType'

export default async (vue: { store: Store<StoreType> }) => {
  await vue.store.dispatch('getCategories')
  await vue.store.dispatch('getProducts')
  await vue.store.dispatch('getMenu')
}
