import { Store } from 'vuex'
import { StoreType } from '~/store/StoreType'

export default (vue: { store: Store<StoreType> }) => {
  vue.store.dispatch('getMainImages')
  vue.store.dispatch('getCategories')
  // vue.store.dispatch('getProducts')
  vue.store.dispatch('getMenu')
}
