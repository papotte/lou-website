<template>
  <v-app dark>
    <h3 class="mb-2" v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h3>
    <h3 v-else>
      {{ otherError }}
    </h3>
    <NuxtLink to="/">
      Volver al inicio
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: 'La página que buscas no existe',
      otherError: 'Oops, algo no está bien. Vuelve a intentarlo!'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
