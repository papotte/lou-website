import Vue from 'vue'

Vue.filter('contentfulImage', (image) => {
  if (!image) {
    return ''
  }
  return 'https:' + image.fields.file.url
})

const contentful = require('contentful')

export default contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN
})
