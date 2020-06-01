export default async ({ store }) => {
  await store.dispatch('getProducts')
  await store.dispatch('getMenu')
}
