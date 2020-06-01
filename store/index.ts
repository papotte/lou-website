import { getModule, Getter, Module, Vue, VuexAction, VuexModule, VuexMutation } from 'nuxt-property-decorator'
import Vuex from 'vuex'
import client from '~/plugins/contentful'

interface StoreType {
  contentful: ContentfulStore
}

Vue.use(Vuex)
const store = new Vuex.Store<StoreType>({})

@Module({
  name: 'contentful',
  dynamic: true,
  namespaced: true,
  store
})
export default class ContentfulStore extends VuexModule {
  public products: any = null
  public categories: any = null
  public menus: any = null

  get allMenus() {
    return this.menus
  }

  get allProducts() {
    return this.products
  }

  get allCategories() {
    return this.categories
  }

  @VuexMutation
  updateMenu(products: any) {
    this.menus = products
  }

  @VuexMutation
  updateProducts(products: any) {
    this.products = products
  }

  @VuexMutation
  updateCategories(categories: any) {
    this.categories = categories
  }

  @VuexAction
  async getMenu() {
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: 'product',
        'fields.category.sys.contentType.sys.id': 'category',
        'fields.category.fields.slug[match]': 'menu',
        order: '-sys.createdAt'
      })
      console.log(response.items[0].fields)
      if (response.items.length > 0) {
        this.updateMenu(response.items)
      }
    } catch (err) {
      console.error(err)
    }
  }

  @VuexAction
  async getProducts() {
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: 'product',
        order: '-sys.createdAt'
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
        content_type: 'category',
        order: 'fields.order'
      })
      if (response.items.length > 0) {
        this.updateCategories(response.items)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const ContentfulModule = getModule(ContentfulStore)
