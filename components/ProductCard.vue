<template>
  <v-card
    flat
    tile
    class="border-primary d-flex flex-column"
    min-height="430px"
  >
    <v-img max-height="200px" :src="image | contentfulImage({ h: 200 })" />
    <v-toolbar flat dense color="transparent" max-height="48px">
      <v-toolbar-title>
        <div class="headline primary--text">
          {{ cardTitle }}
        </div>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="isProduct">
        <v-list-item class="currency px-0">
          <span>{{ card.fields.price | currency }}</span>
        </v-list-item>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-subtitle v-if="isProduct" class="py-0 secondary--text">
      {{ card.fields.productName }}
    </v-card-subtitle>

    <v-card-text
      class="card-body text--primary mt-2 py-1"
      v-html="$md.render(description)"
    />
    <v-spacer />
    <v-card-actions class="mb-2 justify-center">
      <v-btn color="secondary text-none text-center" @click="handleClick">
        {{ buttonText }}
      </v-btn>
    </v-card-actions>
    <OrderPopup v-if="isProduct" :activator.sync="openOrder" :item="card" />
    <CategoryPopup
      v-else
      :activator.sync="openCategory"
      :category-id="card.sys.id"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import OrderPopup from '~/components/OrderPopup.vue'
import CategoryPopup from '~/components/CategoryPopup.vue'

@Component({
  components: { CategoryPopup, OrderPopup }
})
export default class ProductCard extends Vue {
  @Prop() card!: any
  @Prop({ type: Boolean }) isProduct!: boolean

  openOrder = false
  openCategory = false

  get image() {
    if (Array.isArray(this.card.fields.image)) {
      return this.card.fields.image[0]
    }
    return this.card.fields.image
  }

  get cardTitle() {
    if (this.isProduct) {
      return this.card.fields.category.fields.title
    }
    return this.card.fields.title
  }

  get description() {
    if (this.isProduct) {
      return this.card.fields.productDescription
    }
    return this.card.fields.categoryDescription
  }

  get buttonText() {
    if (this.isProduct) {
      return 'Hacer pedido'
    }
    return 'Ver más'
  }

  handleClick() {
    if (this.isProduct) {
      this.openOrder = true
    } else {
      this.openCategory = true
    }
  }
}
</script>

<style scoped lang="scss">
.border-primary {
  border: 8px solid var(--v-primary-base);
}

.card-body {
  text-overflow: ellipsis;
  overflow: hidden;

  .v-list-item__content {
    padding: 0;
  }
}

.text-center {
  > * {
    margin: 0 auto;
  }
}
</style>
