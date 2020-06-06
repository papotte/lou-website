<template>
  <v-dialog v-model="model" fullscreen>
    <v-card tile>
      <v-toolbar class="headline" color="secondary" dark>
        <v-toolbar-title class="headline">
          Pedidos
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn dark text @click.native="dialog = false" icon>
            <v-icon>fas fa-times</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-3">
        <v-row>
          <v-col class="order" cols="12" md="5">
            <v-list class="pa-0">
              <v-list-item class="title">
                <span class="primary--text">Tu orden:</span>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-avatar></v-list-item-avatar>
                  <v-list-item-title class="subtitle-1 font-weight-bold">
                    {{ item.fields.category.fields.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="body-2">
                    <div>{{ item.fields.productName }}</div>
                    <div>{{ item.fields.productDescription }}</div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="10" offset="1" md="7" offset-md="0">
            <v-form v-model="valid" :lazy-validation="false">
              <v-text-field
                v-model="form.name"
                outlined
                label="Nombre"
                type="text"
                :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                name="nombre"
                required
              />
              <v-text-field
                v-model="form.telephone"
                outlined
                label="Teléfono"
                type="text"
                :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                name="telefono"
                hint="Solo para preguntas referentes a esta orden"
                persistent-hint
                required
              />
              <v-text-field
                v-model="form.address"
                outlined
                label="Dirección"
                type="text"
                :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                name="address"
                hint="Solo para efectuar el envío a domicilio"
                persistent-hint
                required
              />
              <v-text-field
                v-model="form.quantity"
                outlined
                label="Cantidad"
                type="number"
                :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                name="quantity"
                required
              />
              <v-textarea
                v-model="form.message"
                outlined
                label="Mensaje"
                name="mensaje"
                auto-grow
                value=""
                rows="2"
                color="primary"
              />
              <v-checkbox
                v-model="form.acceptCondition"
                :label="validationText"
                :rules="[(v) => !!v || 'Este campo es obligatorio']"
              />
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pb-3 px-6">
        <v-spacer></v-spacer>
        <v-btn color="grey" class="text-none" text @click="model = false">
          Cancelar
        </v-btn>
        <v-btn
          color="secondary"
          class="text-none"
          :disabled="!valid"
          @click="doOrder"
        >
          Pedir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'
import ContactForm from '~/components/ContactForm.vue'

@Component({
  components: { ContactForm }
})
export default class OrderPopup extends Vue {
  @PropSync('activator', { type: Boolean }) model!: boolean
  @Prop() item!: any

  form = {
    name: '',
    telephone: '',
    address: '',
    quantity: 1,
    message: '',
    acceptCondition: false
  }

  valid = false
  validationText =
    'Al hacer click en "Pedir" acepto que mi información sea usada para el propósito de envío a domicilio. ' +
    'El monto a pagar deberá ser entregado a más tardar cuando se reciba el producto. ' +
    'Este monto no incluye el servicio de domicilio, que deberá ser pagado directamente al domiciliario.'

  doOrder() {
    // TODO: Add order;
    this.model = false
  }
}
</script>

<style scoped lang="scss">
.v-list.pa-0 {
  .v-list-item {
    padding: 0;
  }
}
</style>
