<template>
  <v-row id="about" class="mx-0">
    <v-col tile class="pa-0" cols="12" md="6" order-md="first" order="last">
      <v-img height="500" :src="image | contentfulImage({ h: 500 })">
        <template v-slot:placeholder>
          <v-skeleton-loader height="500px" type="image"></v-skeleton-loader>
        </template>
      </v-img>
    </v-col>
    <v-col cols="12" md="4" offset-md="1" class="px-5 px-md-0">
      <h2 class="mt-md-12 mt-6 secondary--text display-3">
        Handmade with love
      </h2>
      <p class="mt-md-12 mt-6">
        Puedes usar este espacio para incorporar más detalles sobre tu empresa.
        Escribe sobre tu personal y los servicios que ofreces. Cuéntales a los
        visitantes la historia sobre cómo se te ocurrió la idea de tu negocio y
        diles qué te diferencia de tus competidores. Haz que tu empresa se
        destaque y muestra a tus visitantes quién eres. Consejo: Agrega tu
        propia imagen haciendo clic en la imagen y luego en Cambiar Imagen.
      </p>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ContentfulModule } from '~/store'

@Component
export default class Profile extends Vue {
  get image() {
    return ContentfulModule.images.profile
  }
}
</script>
