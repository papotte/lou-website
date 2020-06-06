<template>
  <v-card
    flat
    tile
    class="border-primary d-flex flex-column"
    min-height="430px"
  >
    <v-img max-height="200px" :src="image | contentfulImage" />
    <v-toolbar flat dense color="transparent" max-height="48px">
      <v-toolbar-title>
        <div class="headline primary--text">
          {{ card.fields.title }}
        </div>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="card.fields.showLatest">
        <v-list-item class="currency px-0">
          <span>{{ latest.fields.price | currency('$') }}</span>
        </v-list-item>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-subtitle v-if="card.fields.showLatest" class="py-0 secondary--text">
      {{ latest.fields.productName }}
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
    <OrderPopup
      v-if="card.fields.showLatest"
      :activator.sync="openOrder"
      :item="latest"
    />
    <CategoryPopup
      v-else
      :activator.sync="openCategory"
      :category-id="card.sys.id"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ContentfulModule } from '~/store'
import OrderPopup from '~/components/OrderPopup.vue'
import CategoryPopup from '~/components/CategoryPopup.vue'

@Component({
  components: { CategoryPopup, OrderPopup }
})
export default class Profile extends Vue {
  @Prop() card!: any

  openOrder = false
  openCategory = false

  get image() {
    let url = this.card.fields.image
    if (this.card.fields.showLatest) {
      url = this.latest.fields.image[0]
    }
    return url
  }

  get latest() {
    // TODO: Change for getLatest(categoryId) or similar
    return ContentfulModule.allMenus[0]
  }

  get description() {
    if (this.card.fields.showLatest) {
      return this.latest.fields.productDescription
    }
    return this.card.fields.categoryDescription
  }

  get buttonText() {
    if (this.card.fields.showLatest) {
      return 'Hacer pedido'
    }
    return 'Ver más'
  }

  handleClick() {
    if (this.card.fields.showLatest) {
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
