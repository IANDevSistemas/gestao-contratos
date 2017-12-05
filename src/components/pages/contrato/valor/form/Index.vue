<template>
  <section>
    <crud-form-actions :title="value.id  ? 'Alterando #' + value.id : 'Incluindo'" @back="$router.go(-1)" @copy="() => { value.id = null }" @clear="value = {}" @save="onSave()" @delete="onDelete()" />
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-4">
        <!-- Data Referencia Inicial -->
        <q-field :error="$v.value.datareferenciainicial.$error" error-label="Entre com um valor válido">
          <q-input type="date" v-model.trim="value.datareferenciainicial" float-label="Ref. Inicial" @blur="$v.value.datareferenciainicial.$touch"></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- Data Referencia Final -->
        <q-field :error="$v.value.datareferenciafinal.$error" error-label="Entre com um valor válido">
          <q-datetime type="date" v-model.trim="value.datareferenciafinal" float-label="Ref. Final" @blur="$v.value.datareferenciafinal.$touch" />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- Data Referencia Final -->
        <q-field :error="$v.value.datareferenciafinal.$error" error-label="Entre com um valor válido" :count="255">
          <q-datetime type="date" v-model.trim="value.datareferenciafinal" float-label="Razão Social" @blur="$v.value.datareferenciafinal.$touch" />
        </q-field>
      </div>
    </div>
  </section>
</template>

<script>
import AbstractForm from "@/abstract/crud/form"
import { checkCpfCnpj } from "@/abstract/util/validation"
import { computed } from "@/abstract/util/mixins"
import isArray from "lodash/isArray"
import { required } from "vuelidate/lib/validators"
import serviceMunicipio from "service/municipio"

export default {
  extends: AbstractForm,
  data() {
    return {
      telefone: [],
      municipio: ""
    }
  },
  ...computed({
    serviceName: "contratoValor"
  }),
  validations: {
    value: {
      valor: { required },
      datavencimento: {},
      datareferenciainicial: { required },
      datareferenciafinal: { required },
      datapagamento: {},
      valorpago: {}
    }
  }
}
</script>