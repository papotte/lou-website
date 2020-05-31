import {
  Module,
  Vue,
  VuexAction,
  VuexModule,
  VuexMutation
} from 'nuxt-property-decorator'
import Vuex from 'vuex'
import client from '~/plugins/contentful'

Vue.use(Vuex)
const store = new Vuex.Store({})

@Module({
  name: 'ContentfulStore',
  dynamic: true,
  store
})
export default class ContentfulStore extends VuexModule {
  public products: any = null
  public categories: any = null

  get allProducts() {
    return this.products
  }

  get allCategories() {
    return this.categories
  }

  @VuexMutation
  updateProducts(products: any) {
    console.log(products)
    this.products = products
  }

  @VuexMutation
  updateCategories(categories: any) {
    console.log(categories)
    this.categories = categories
  }

  @VuexAction
  async getProducts() {
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: 'product'
      })
      if (response.items.length > 0) {
        this.updateProducts(response.items)
      }
    } catch (err) {
      console.error(err)
    }
  }

  @VuexAction
  async getCategories() {
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: 'category'
      })
      if (response.items.length > 0) {
        this.updateCategories(response.items)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
