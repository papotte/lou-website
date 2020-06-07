<template>
  <v-dialog v-model="model" fullscreen>
    <v-card v-if="category" tile>
      <v-toolbar class="headline" color="secondary" dark>
        <v-toolbar-title class="headline">
          {{ category.fields.title }}
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn dark text icon @click.native="model = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-row v-if="products">
          <v-col
            v-for="product in products"
            :key="product.sys.id"
            cols="6"
            md="4"
          >
            <ProductCard :card="product" :is-product="true" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col offset="3" cols="6">
            Coming soon!
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'nuxt-property-decorator'
import { ContentfulModule } from '~/store'

const ProductCard = () =>
  import(/* webpackChunkName: "productCard" */ '~/components/ProductCard.vue')

@Component({
  components: {
    ProductCard
  }
})
export default class CategoryPopup extends Vue {
  @PropSync('activator', { type: Boolean }) model!: boolean
  @Prop({ type: String }) categoryId!: string

  products?: any[]
  category: any = null

  @Watch('categoryId')
  async updateProducts() {
    this.products = await ContentfulModule.getProducts(this.categoryId)
    this.category = await ContentfulModule.getCategory(this.categoryId)
  }

  mounted() {
    this.updateProducts()
  }
}
</script>

<style scoped></style>
