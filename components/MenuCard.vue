<template>
  <v-col cols="12" md="4" class="pa-0 mb-0 mb-md-3" v-if="product">
    <v-hover v-slot:default="{ hover }">
      <v-img
        height="300px"
        :class="hover ? 'has-overlay' : ''"
        :src="product.fields.image[0] | contentfulImage"
        @click="hover = !hover"
      >
        <v-row class="content ma-0" :class="hover ? '' : 'hidden'">
          <v-col class="py-8" cols="8" offset="2">
            <v-row class="display-1 white--text">
              {{ product.fields.productName }}
            </v-row>
            <v-row class="body-1 mt-4 white--text">
              {{ product.fields.productDescription }}
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </v-hover>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class MenuCard extends Vue {
  @Prop() product!: any
}
</script>

<style lang="scss" scoped>
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
