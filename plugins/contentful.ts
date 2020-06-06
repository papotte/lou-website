import Vue from 'vue'
import { createClient } from 'contentful'
import { createClient as managementClient } from 'contentful-management'

type ContentfulImage = { fields: { file: { url: string } } }

Vue.filter('contentfulImage', (image: ContentfulImage) => {
  if (!image) {
    return ''
  }
  return 'https:' + image.fields.file.url
})

export const writeClient = managementClient({
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN_WRITE || ''
})

const client = createClient({
  space: process.env.CONTENTFUL_SPACE || '',
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN || ''
})
export default client
