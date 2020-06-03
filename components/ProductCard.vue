<template>
  <v-card flat tile class="border-primary d-flex flex-column" height="430px">
    <v-img height="200px" :src="image" />
    <v-card-title class="headline primary--text text-center">
      <span>{{ card.fields.title }}</span>
    </v-card-title>
    <v-card-subtitle
      v-if="card.fields.showLatest"
      class="pb-0 secondary--text text-center"
    >
      {{ latest.fields.productName }}
    </v-card-subtitle>
    <v-card-text
      class="card-body text--primary mt-2"
      v-html="$md.render(description)"
    />
    <v-spacer />
    <v-card-actions class="mb-2 justify-center">
      <v-btn color="secondary text-none text-center" @click="handleClick">
        {{ buttonText }}
      </v-btn>
    </v-card-actions>
    <OrderPopup :activator.sync="openOrder" />
    <CategoryPopup :activator.sync="openCategory" :category-id="card.sys.id" />
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
  @Prop() imageMethod!: (url: string) => string

  openOrder = false
  openCategory = false

  get image() {
    let url = this.card.fields.image
    if (this.card.fields.showLatest) {
      url = this.latest.fields.image[0]
    }
    return this.imageMethod(url)
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
}

.text-center {
  > * {
    margin: 0 auto;
  }
}
</style>
