<template>
  <v-dialog v-model="model" max-width="800px">
    <v-card>
      <v-card-title class="headline" primary-title>
        Coming soon!
      </v-card-title>

      <v-card-text>
        You only need to wait a bit longer
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" class="text-none" text @click="model = false">
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class OrderPopup extends Vue {
  @PropSync('activator', { type: Boolean }) model!: boolean
}
</script>

<style scoped></style>
