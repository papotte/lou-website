import Vue from 'vue'
import { createClient } from 'contentful'
import { createClient as managementClient } from 'contentful-management'

type ContentfulImage = { fields: { file: { url: string } } }
export type ImageOptions = { w?: number; h?: number; fit?: string }
Vue.filter(
  'contentfulImage',
  (image: ContentfulImage, options: ImageOptions) => {
    if (!image) {
      return ''
    }
    const suffix = []
    if (options) {
      if (options.w) {
        suffix.push('w=' + options.w)
      }
      if (options.h) {
        suffix.push('h=' + options.h)
      }
      if (options.fit) {
        suffix.push('fit=' + options.fit)
      }
    }
    return 'https:' + image.fields.file.url + '?' + suffix.join('&')
  }
)

export const writeClient = managementClient({
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN_WRITE || ''
})

const client = createClient({
  space: process.env.CONTENTFUL_SPACE || '',
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN || ''
})
export default client
