<template>
  <v-form
    v-model="valid"
    name="contact"
    method="POST"
    data-netlify="true"
    :lazy-validation="false"
  >
    <v-text-field
      outlined
      label="Nombre"
      type="text"
      :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
      name="nombre"
      required
    />
    <v-text-field outlined label="Email" type="email" name="email" />
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
      value=""
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
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ContactForm extends Vue {
  valid = false
}
</script>
>
