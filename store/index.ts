import {
  getModule,
  Module,
  Vue,
  VuexAction,
  VuexModule,
  VuexMutation
} from 'nuxt-property-decorator'
import Vuex from 'vuex'
import client, { writeClient } from '~/plugins/contentful'
import { OrderForm } from '~/model/OrderForm'
import { StoreType } from '~/store/StoreType'

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

  @VuexAction({ rawError: true })
  async addOrder(order: OrderForm) {
    if (!writeClient) throw new Error('Contentful no está listo')
    const client = await (
      await writeClient.getSpace(process.env.CONTENTFUL_SPACE || '')
    ).getEnvironment('master')
    const product = await client.getEntry(order.productId)
    if (product) {
      const available = product.fields.maxAvailable['es-CO']
      if (available < order.quantity) {
        throw new Error(
          'Lo sentimos, pero no hay suficiente disponibilidad en este momento'
        )
      }
      product.fields.maxAvailable['es-CO'] -= order.quantity
      const updatedProduct = await product.update()
      const newOrder = await client.createEntry('order', {
        fields: {
          name: { 'es-CO': order.name },
          phone: { 'es-CO': order.telephone },
          address: { 'es-CO': order.address },
          quantity: { 'es-CO': order.quantity },
          total: { 'es-CO': order.total },
          message: { 'es-CO': order.message },
          acceptCondition: { 'es-CO': order.acceptCondition },
          product: {
            'es-CO': {
              sys: {
                type: 'Link',
                linkType: 'Entry',
                id: updatedProduct.sys.id
              }
            }
          }
        }
      })
      await updatedProduct.publish()
      await newOrder.publish()
      return newOrder
    } else {
      throw new Error('Lo sentimos, parece que este producto a no existe!')
    }
  }
}

export const ContentfulModule = getModule(ContentfulStore)
