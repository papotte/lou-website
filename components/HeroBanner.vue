<template>
  <v-col id="start" cols="12" class="pa-0">
    <v-img
      :aspect-ratio="16 / 9"
      max-height="500"
      :src="image | contentfulImage({ h: 500 })"
    >
      <template v-slot:placeholder>
        <v-skeleton-loader min-height="500" type="image"></v-skeleton-loader>
      </template>
      <v-row align="start" class="mt-md-10 mt-sm-4 pa-2 fill-height">
        <v-col offset="1" cols="12" sm="3">
          <h3>Bienvenido a mi página</h3>
          <v-btn
            color="secondary"
            class="mt-4 text-none font-weight-bold"
            to="/#products"
          >
            Hacer un pedido
          </v-btn>
        </v-col>
      </v-row>
    </v-img>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ContentfulModule } from '~/store'

@Component
export default class HeroBanner extends Vue {
  order() {
    this.$emit('order')
  }

  get image() {
    return ContentfulModule.images.banner
  }
}
</script>
