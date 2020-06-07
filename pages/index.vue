<template>
  <v-col class="pa-0" cols="12">
    <HeroBanner />
    <Profile />
    <v-container id="products">
      <v-row class="mt-11">
        <v-skeleton-loader v-if="!categories" type="card" width="33vh" />
        <v-col
          v-for="card in categories"
          :key="card.sys.id"
          cols="12"
          md="4"
          class="px-5"
        >
          <ProductCard
            :card="card.fields.showLatest ? currentMenu : card"
            :is-product="!!card.fields.showLatest"
          />
        </v-col>
      </v-row>
      <v-row id="contact" class="mt-11">
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
              <ContactForm />
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-skeleton-loader v-if="!latestMenus" type="image" height="300" />
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

const ContactForm = () =>
  import(/* webpackChunkName: "contact" */ '~/components/ContactForm.vue')
const HeroBanner = () =>
  import(/* webpackChunkName: "banner" */ '~/components/HeroBanner.vue')
const Profile = () =>
  import(/* webpackChunkName: "profile" */ '~/components/Profile.vue')
const ProductCard = () =>
  import(/* webpackChunkName: "productCard" */ '~/components/ProductCard.vue')
const MenuCard = () =>
  import(/* webpackChunkName: "menuCard" */ '~/components/MenuCard.vue')

@Component({
  components: {
    ProductCard,
    Profile,
    HeroBanner,
    MenuCard,
    ContactForm
  }
})
export default class IndexPage extends Vue {
  get categories() {
    return ContentfulModule.allCategories
  }

  get latestMenus() {
    const allMenus = ContentfulModule.allMenus
    if (allMenus) {
      return allMenus.filter((_: any, i: number) => i < 3)
    }
    return null
  }

  get currentMenu() {
    return ContentfulModule.allMenus ? ContentfulModule.allMenus[0] : null
  }
}
</script>
