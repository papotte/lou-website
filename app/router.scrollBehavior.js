import goTo from 'vuetify/es5/services/goto'

export default function(to, _, savedPosition) {
  let scrollTo = 0
  const options = {}
  if (to.hash) {
    scrollTo = to.hash
    options.offset = 64
  } else if (savedPosition) {
    scrollTo = savedPosition.y
  }

  return goTo(scrollTo, options)
}
