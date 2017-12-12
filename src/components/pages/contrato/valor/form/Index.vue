<template>
  <section>
    <q-card>
      <q-card-main>
        <crud-form-actions @back="$router.go(-1)" @copy="value.id = null" @clear="value = {}" @save="onSave()" @delete="onDelete()" />
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-4">
            <!-- Data Vencimento -->
            <q-field :error="$v.value.datavencimento.$error" error-label="Entre com um valor válido">
              <q-datetime type="date" format="DD/MM/YYYY" v-model.trim="value.datavencimento" float-label="Vencimento" @blur="$v.value.datavencimento.$touch" />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-4">
            <!-- Valor -->
            <q-field :error="$v.value.valor.$error" error-label="Valor deve ser maior que 0">
              <q-input v-model="value.valor" float-label="Valor" align="right" v-money @blur="$v.value.valor.$touch" />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-4">
            <!-- Situacao -->
            <q-field :error="$v.value.situacao.$error" error-label="Selecione um valor">
              <q-select v-model="value.situacao" float-label="Situação" radio :options="[ { value: 'A', label: 'Ativo' }, { value: 'I', label: 'Inativo' } ]" @blur="$v.value.situacao.$touch" />
            </q-field>
          </div>
        </div>

        <h6>Referência</h6>
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-6">
            <!-- Data Referencia Inicial -->
            <q-field :error="$v.value.datareferenciainicial.$error" error-label="Entre com um valor válido">
              <q-datetime type="date" format="DD/MM/YYYY" v-model.trim="value.datareferenciainicial" float-label="Ref. Inicial" @blur="$v.value.datareferenciainicial.$touch" />
            </q-field>
          </div>

          <div class="col-xs-12 col-sm-6">
            <!-- Data Referencia Final -->
            <q-field :error="$v.value.datareferenciafinal.$error" error-label="Entre com um valor válido">
              <q-datetime type="date" format="DD/MM/YYYY" v-model.trim="value.datareferenciafinal" float-label="Ref. Final" @blur="$v.value.datareferenciafinal.$touch" />
            </q-field>
          </div>
        </div>

        <h6>Pagamento</h6>
        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-6">
            <!-- Data Pagamento -->
            <q-field :error="$v.value.datapagamento.$error" error-label="Entre com um valor válido">
              <q-datetime type="date" format="DD/MM/YYYY" v-model.trim="value.datapagamento" float-label="Data" @blur="$v.value.datapagamento.$touch" />
            </q-field>
          </div>
          <div class="col-xs-12 col-sm-6">
            <!-- Valor Pago -->
            <q-field :error="$v.value.valorpago.$error" error-label="Valor deve ser maior que 0">
              <q-input v-model="value.valorpago" type="tel" v-money float-label="Valor" align="right" @blur="$v.value.valorpago.$touch" />
            </q-field>
          </div>
        </div>
      </q-card-main>
    </q-card>
    <crud-form-modal ref="modal" />
  </section>
</template>

<script>
import AbstractForm from "@/abstract/crud/form"
import { computed } from "@/abstract/util/mixins"
import { required } from "vuelidate/lib/validators"

export default {
  extends: AbstractForm,
  ...computed({
    serviceName: "contratoValor"
  }),
  validations: {
    value: {
      valor: { required },
      datavencimento: {},
      situacao: {},
      datareferenciainicial: { required },
      datareferenciafinal: { required },
      datapagamento: {},
      valorpago: {}
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

section
  margin auto
  max-width 800px

h6
  color $primary
  margin-top 32px
</style>
