<template>
  <v-col class="pa-0" cols="12">
    <v-col cols="12" class="pa-0">
      <client-only>
        <v-img
          :aspect-ratio="16 / 9"
          max-height="500px"
          src="/images/hero-banner.jpg"
        >
          <v-row align="start" class="mt-md-10 mt-sm-4 pa-2 fill-height">
            <v-col offset="1" cols="12" sm="3">
              <h3>Bienvenido a mi página</h3>
              <v-btn
                nuxt
                color="secondary"
                class="mt-4 text-none font-weight-bold"
              >
                Hacer un pedido
              </v-btn>
            </v-col>
          </v-row>
        </v-img>
      </client-only>
    </v-col>
    <v-row>
      <v-col tile class="pa-0" cols="12" md="6">
        <v-img height="500" src="/images/photo.jpg" />
      </v-col>
      <v-col cols="12" md="4" offset-md="1">
        <h2 class="mt-12 secondary--text display-3">Handmade with love</h2>
        <p class="mt-6">
          Puedes usar este espacio para incorporar más detalles sobre tu
          empresa. Escribe sobre tu personal y los servicios que ofreces.
          Cuéntales a los visitantes la historia sobre cómo se te ocurrió la
          idea de tu negocio y diles qué te diferencia de tus competidores. Haz
          que tu empresa se destaque y muestra a tus visitantes quién eres.
          Consejo: Agrega tu propia imagen haciendo clic en la imagen y luego en
          Cambiar Imagen.
        </p>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="mt-11">
        <v-col
          v-for="card in categories"
          :key="card.sys.id"
          cols="12"
          md="4"
          class="px-5"
        >
          <v-card v-if="card" flat tile class="border-primary" height="430px">
            <v-img height="200px" :src="getImage(card.fields.image)" />
            <v-card-title class="headline primary--text">
              {{ card.fields.title }}
            </v-card-title>
            <v-card-subtitle class="pb-0"></v-card-subtitle>
            <v-card-text
              class="card-body text--primary mt-2"
              v-html="$md.render(card.fields.categoryDescription)"
            />

            <v-card-actions class="mb-2 justify-center">
              <v-btn color="secondary text-none text-center">
                Ver más
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-11">
        <v-col cols="10" offset="1">
          <v-card flat>
            <v-card-title class="display-2 primary--text">
              A tu servicio
            </v-card-title>
            <v-card-subtitle class="mt-1 body-1">
              Cuéntame un poco sobre tu evento así puedo comenzar el proceso
              creativo
            </v-card-subtitle>
            <v-card-text>
              <v-form
                v-model="valid"
                name="contact"
                method="POST"
                data-netlify="true"
                :lazy-validation="true"
              >
                <v-text-field
                  outlined
                  label="Nombre"
                  type="text"
                  :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                  name="nombre"
                  required
                />
                <v-text-field
                  outlined
                  label="Email"
                  type="email"
                  name="email"
                />
                <v-text-field
                  outlined
                  label="Teléfono"
                  type="text"
                  :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                  name="telefono"
                  required
                />
                <v-textarea
                  outlined
                  label="Mensaje"
                  name="mensaje"
                  :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                  auto-grow
                  rows="4"
                  color="primary"
                  required
                />
                <v-btn
                  :right="true"
                  color="secondary"
                  :disabled="!valid"
                  class="text-none px-6"
                  type="submit"
                >
                  Enviar
                </v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <MenuCard
        v-for="product in latestMenus"
        :key="product.sys.id"
        :product="product"
      />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ContentfulModule } from '~/store'
import MenuCard from '~/components/MenuCard.vue'

@Component({ components: { MenuCard } })
export default class IndexPage extends Vue {
  valid = true

  get categories() {
    return ContentfulModule.allCategories
  }

  get nextMenu() {
    return ContentfulModule.allMenus[0]
  }

  get latestMenus() {
    return ContentfulModule.allMenus.filter((_: any, i: number) => i < 3)
  }

  getImage(image: { fields: { file: { url: string } } }) {
    console.log(image.fields.file.url)
    return 'https:' + image.fields.file.url
  }
}
</script>
<style lang="scss" scoped>
.border-primary {
  border: 8px solid var(--v-primary-base);
}

.card-body {
  height: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.hidden {
  visibility: hidden;
}

.has-overlay {
  .content {
    &:after {
      content: ' ';
      position: absolute;
      background: var(--v-accent-base);
      background: black;
      height: 100%;
      width: 100%;
      opacity: 0.5;
      z-index: 1;
    }

    height: 100%;
    opacity: 1;

    .col {
      z-index: 2;
    }
  }
}
</style>
