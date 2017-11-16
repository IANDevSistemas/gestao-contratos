<template>
  <section>

    <h6>Informações Básicas</h6>
    <!-- Nome Fantasia -->
    <q-field :error="$v.value.nomefantasia.$error" error-label="Entre com um valor válido" :count="255">
      <q-input v-model.trim="value.nomefantasia" float-label="Nome Fantasia" @blur="$v.value.nomefantasia.$touch"></q-input>
    </q-field>

    <!-- Nome Razão Social -->
    <q-field :error="$v.value.nomerazaosocial.$error" error-label="Entre com um valor válido" :count="255">
      <q-input v-model.trim="value.nomerazaosocial" float-label="Razão Social" @blur="$v.value.nomerazaosocial.$touch"></q-input>
    </q-field>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-8">
        <!-- Apelido -->
        <q-field :error="$v.value.apelido.$error" error-label="Entre com um valor válido" :count="255">
          <q-input v-model.trim="value.apelido" float-label="Apelido" @blur="$v.value.apelido.$touch"></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- CNPJ / CPF -->
        <q-field :error="$v.value.cnpjcpf.$error" error-label="Entre com um valor válido">
          <q-input v-model.trim="value.cnpjcpf" align="right" float-label="CNPJ / CPF" @blur="$v.value.cnpjcpf.$touch" type="tel" v-mask="[ '###.###.###-##', '##.###.###/####-##' ]" />
        </q-field>
      </div>
    </div>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-8">
        <!-- Telefone -->
        <q-field :error="$v.value.telefone.$error" error-label="Entre com um valor válido">
          <q-chips-input v-model="telefone" align="right" float-label="Telefone" @blur="$v.value.telefone.$touch" type="tel" v-mask="'(##) ####-####'" :before="[ { icon: 'phone'} ]" />
        </q-field>
      </div>
    </div>

    <h6>Endereço</h6>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-6">
        <!-- Endereço -->
        <q-field :error="$v.value.endereco.$error" error-label="Entre com um valor válido" :count="255">
          <q-input v-model.trim="value.endereco" float-label="Endereço" @blur="$v.value.endereco.$touch"></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-3">
        <!-- Número -->
        <q-field :error="$v.value.numero.$error" error-label="Valor deve ser maior que 0">
          <q-input v-model.trim="value.numero" align="right" float-label="Nº" @blur="$v.value.numero.$touch" type="tel" v-mask="'#############'" />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-3">
        <!-- Complemento -->
        <q-field :error="$v.value.complemento.$error" error-label="Entre com um valor válido" :count="255">
          <q-input v-model.trim="value.complemento" float-label="Complemento" @blur="$v.value.complemento.$touch"></q-input>
        </q-field>
      </div>
    </div>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-4">
        <!-- Número -->
        <q-field :error="$v.value.numero.$error" error-label="Valor deve ser maior que 0">
          <q-input v-model.trim="value.numero" align="right" float-label="Nº" @blur="$v.value.numero.$touch" type="tel" v-mask="'#############'" />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- CEP -->
        <q-field :error="$v.value.cep.$error" error-label="Valor deve ser maior que 0">
          <q-input v-model.trim="value.cep" align="right" float-label="CEP" @blur="$v.value.cep.$touch" type="tel" v-mask="'#####-###'" />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- Município -->
        <q-field :error="$v.value.municipio.$error" error-label="Valor deve ser maior que 0">
          <q-input v-model.trim="value.municipio" align="right" float-label="Município" @blur="$v.value.municipio.$touch" />
        </q-field>
      </div>
    </div>

  </section>
</template>

<script>
import Form from "@/abstract/crud/form"
import { between, email, minValue, required } from "vuelidate/lib/validators"

export default {
  extends: Form,
  data() {
    return {
      telefone: []
    }
  },
  computed: {
    title() {
      return "Cadastro Empresa"
    }
  },
  validations: {
    value: {
      nomefantasia: { required },
      nomerazaosocial: { required },
      apelido: {},
      cnpjcpf: {},
      telefone: {},
      endereco: {},
      numero: {},
      complemento: {},
      cep: {},
      municipio: {}
    }
  },
  watch: {
    telefone(value) {
      this.value.telefone = value.join(";")
    },
    value(value) {
      this.telefone = value.telefone.split(";")
    }
  }
}
</script>

<style lang="stylus">
.q-card
  margin auto
  max-width 800px
</style>
