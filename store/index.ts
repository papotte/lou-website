import { getModule, Module, Vue, VuexAction, VuexModule, VuexMutation } from 'nuxt-property-decorator'
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
  public categories: any = null
  public menus: any = null
  public images = {
    banner: null,
    profile: null
  }

  get allMenus() {
    return this.menus
  }

  get allCategories() {
    return this.categories
  }

  @VuexMutation
  updateMenu(products: any) {
    this.menus = products
  }

  @VuexMutation
  updateCategories(categories: any) {
    this.categories = categories
  }

  @VuexMutation
  private setImages(images: { banner: any; profile: any }) {
    this.images = images
  }

  @VuexAction
  private setBanner(url: any) {
    this.setImages({ ...this.images, banner: url })
  }

  @VuexAction
  private setProfile(url: any) {
    this.setImages({ ...this.images, profile: url })
  }

  @VuexAction
  async getMainImages() {
    const bannerId = '2mA6IGaqrJ6uCB2pIYpMv2'
    const profileId = '6oIvrIVmZOrIFSCVlFym3l'
    try {
      if (!client) return
      const bannerImage = await client.getAsset(bannerId)
      this.setBanner(bannerImage)
      const profileImage = await client.getAsset(profileId)
      this.setProfile(profileImage)
    } catch (err) {
      console.error(err)
    }
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

  @VuexAction({ rawError: true })
  async getCategory(categoryId: string) {
    if (!client || !categoryId) return
    return await client.getEntry(categoryId)
  }

  @VuexAction
  async getProducts(categoryId: string) {
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: 'product',
        'fields.category.sys.id': categoryId,
        order: '-sys.createdAt'
      })
      if (response.items.length > 0) {
        return response.items
      }
    } catch (err) {
      console.error(err)
    }
    return []
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
    const client = await ContentfulStore.prepareClient()

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

  private static async prepareClient() {
    if (!writeClient) throw new Error('Contentful no está listo')
    const space = await writeClient.getSpace(process.env.CONTENTFUL_SPACE || '')
    return space.getEnvironment('master')
  }
}

export const ContentfulModule = getModule(ContentfulStore)
