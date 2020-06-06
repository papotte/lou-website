<template>
  <v-dialog v-model="model" fullscreen>
    <v-card tile>
      <v-form v-model="valid" :lazy-validation="false" name="order">
        <v-toolbar class="headline" color="secondary" dark>
          <v-toolbar-title class="headline">
            Pedidos
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn dark text icon @click.native="model = false">
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
                  <v-list-item-avatar width="80" height="80">
                    <v-img :src="image | contentfulImage" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="subtitle-1 font-weight-bold">
                      {{ item.fields.category.fields.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="body-2">
                      <div>{{ item.fields.productName }}</div>
                      <div>{{ item.fields.productDescription }}</div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text class="mb-2">
                      {{ item.fields.price | currency }}
                    </v-list-item-action-text>
                    <v-text-field
                      v-model="form.quantity"
                      outlined
                      style="width: 80px"
                      dense
                      label="Cantidad"
                      type="number"
                      name="quantity"
                      :rules="[
                        (v) => (!!v && v > 0) || 'Cantidad inválida',
                        (v) =>
                          (!!v && v <= item.fields.maxAvailable) ||
                          'Cantidad inválida'
                      ]"
                      required
                    />
                  </v-list-item-action>
                </v-list-item>
                <v-list-item>
                  <v-list-item class="title">
                    <v-list-item-title class="text-right">
                      Total:
                      {{ (item.fields.price * form.quantity) | currency }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="10" offset="1" md="7" offset-md="0">
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
                type="tel"
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
                class="mt-0"
                :label="validationText"
                :rules="[(v) => !!v || 'Este campo es obligatorio']"
              />
              <v-alert v-if="showAlert" :type="alertType">
                {{ alertText }}
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>

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
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'
import ContactForm from '~/components/ContactForm.vue'
import { ContentfulModule } from '~/store'
import { OrderForm } from '~/model/OrderForm'

@Component({
  components: { ContactForm }
})
export default class OrderPopup extends Vue {
  @PropSync('activator', { type: Boolean }) model!: boolean
  @Prop() item!: any

  form: OrderForm = new OrderForm()

  valid = false
  validationText =
    'Al hacer click en "Pedir" acepto que mi información sea usada para el propósito de envío a domicilio. ' +
    'El monto a pagar deberá ser entregado a más tardar cuando se reciba el producto. ' +
    'Este monto no incluye el servicio de domicilio, que deberá ser pagado directamente al domiciliario.'

  loading = false

  showAlert = false
  alertText = ''
  alertType = 'success'

  get image() {
    return this.item.fields.image[0]
  }

  doOrder() {
    // TODO: Add order;
    this.loading = true
    this.form.total = this.item.fields.price * this.form.quantity
    this.form.productId = this.item.sys.id
    ContentfulModule.addOrder(this.form)
      .then((order) => {
        this.alertType = 'success'
        this.alertText = 'Tu código de pedido es ' + order.sys.id
        this.valid = true
        this.form = new OrderForm()
      })
      .catch((e: Error) => {
        this.alertType = 'error'
        console.log(e)
        this.alertText = 'Se ha producido un error.'
      })
      .finally(() => {
        this.showAlert = true
        this.loading = false
      })
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
