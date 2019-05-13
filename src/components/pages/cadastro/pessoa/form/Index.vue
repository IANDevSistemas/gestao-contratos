<template>
  <section>
    <crud-form-actions
      :title="value.id  ? 'Alterando #' + value.id : 'Incluindo'"
      @back="$router.go(-1)"
      @copy="() => { value.id = null }"
      @clear="value = {}"
      @save="onSave()"
      @delete="onDelete()"
    />

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-8">
        <!-- Nome Fantasia -->
        <q-field
          :error="$v.value.nomefantasia.$error"
          error-label="Entre com um valor válido"
          :count="255"
        >
          <q-input
            v-model.trim="value.nomefantasia"
            float-label="Nome Fantasia"
            @blur="$v.value.nomefantasia.$touch"
          ></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-2">
        <!-- Situação -->
        <q-field
          :error="$v.value.situacao.$error"
          error-label="Entre com um valor válido"
        >
          <q-select
            v-model="value.situacao"
            float-label="Situação"
            :options="[ { value: 'A', label: 'Ativo' }, { value: 'I', label: 'Inativo' } ]"
          />
        </q-field>
      </div>
    </div>

    <!-- Nome Razão Social -->
    <q-field
      :error="$v.value.nomerazaosocial.$error"
      error-label="Entre com um valor válido"
      :count="255"
    >
      <q-input
        v-model.trim="value.nomerazaosocial"
        float-label="Razão Social"
        @blur="$v.value.nomerazaosocial.$touch"
      ></q-input>
    </q-field>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-8">
        <!-- Cód ERP -->
        <q-field
          :error="$v.value.idpessoaerp.$error"
          error-label="Entre com um valor válido"
          :count="255"
        >
          <q-input
            v-model.trim="value.idpessoaerp"
            float-label="Cód ERP"
            @blur="$v.value.idpessoaerp.$touch"
          ></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- Tipo -->
        <q-field
          :error="$v.value.tipopessoa.$error"
          error-label="Entre com um valor válido"
        >
          <q-select
            v-model="value.tipopessoa"
            float-label="Tipo"
            :options="[ { value: 'F', label: 'Fornecedor' }, { value: 'C', label: 'Cliente' }, { value: 'U', label: 'Usuário' } ]"
          />
        </q-field>
      </div>
    </div>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-4">
        <!-- CNPJ / CPF -->
        <q-field
          :error="$v.value.cnpjcpf.$error"
          error-label="Entre com um valor válido"
        >
          <q-input
            v-model.trim="value.cnpjcpf"
            align="right"
            float-label="CNPJ / CPF"
            @blur="$v.value.cnpjcpf.$touch"
            type="tel"
            v-mask="[ '###.###.###-##', '##.###.###/####-##' ]"
          />
        </q-field>
      </div>
    </div>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-8">
        <!-- Telefone -->
        <q-field
          :error="$v.value.telefone.$error"
          error-label="Entre com um valor válido"
        >
          <q-chips-input
            v-model="telefone"
            align="right"
            float-label="Telefone"
            @blur="$v.value.telefone.$touch"
            type="tel"
            v-mask="'(##) ####-####'"
            :before="[ { icon: 'phone'} ]"
          />
        </q-field>
      </div>
    </div>

    <h6>Endereço</h6>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-6">
        <!-- Endereço -->
        <q-field
          :error="$v.value.endereco.$error"
          error-label="Entre com um valor válido"
          :count="255"
        >
          <q-input
            v-model.trim="value.endereco"
            float-label="Endereço"
            @blur="$v.value.endereco.$touch"
          ></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-3">
        <!-- Número -->
        <q-field
          :error="$v.value.numero.$error"
          error-label="Valor deve ser maior que 0"
        >
          <q-input
            v-model.trim="value.numero"
            align="right"
            float-label="Nº"
            @blur="$v.value.numero.$touch"
            type="tel"
            v-mask="'#############'"
          />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-3">
        <!-- Complemento -->
        <q-field :count="255">
          <q-input
            v-model.trim="value.complemento"
            float-label="Complemento"
            @blur="$v.value.complemento.$touch"
          ></q-input>
        </q-field>
      </div>
    </div>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-4">
        <!-- Bairro -->
        <q-field
          :error="$v.value.bairro.$error"
          error-label="Valor Inválido"
        >
          <q-input
            v-model.trim="value.bairro"
            float-label="Bairro"
            @blur="$v.value.bairro.$touch"
          />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- CEP -->
        <q-field
          :error="$v.value.cep.$error"
          error-label="Valor Inválido"
        >
          <q-input
            v-model.trim="value.cep"
            align="right"
            float-label="CEP"
            @blur="$v.value.cep.$touch"
            type="tel"
            v-mask="'#####-###'"
          />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- Município -->
        <q-field
          :error="$v.value.municipio.$error"
          error-label="Valor Inválido"
        >
          <q-input
            v-model.trim="municipio"
            float-label="Município"
            @blur="$v.value.municipio.$touch"
          >
            <q-autocomplete
              @search="services.municipio.search"
              @selected="(item) => { autocompleteSelected('municipio', item) }"
            />
          </q-input>
        </q-field>
      </div>
    </div>

    <crud-form-modal ref="modal" />
  </section>
</template>

<script>
import AbstractForm from "@/abstract/crud/form"
import { computed } from "@/abstract/util/mixins"
import isArray from "lodash/isArray"
import { required } from "vuelidate/lib/validators"

export default {
  extends: AbstractForm,
  data() {
    return {
      telefone: [],
      municipio: ""
    }
  },
  ...computed({
    serviceName: "pessoa"
  }),
  validations: {
    value: {
      nomefantasia: { required },
      situacao: { required },
      nomerazaosocial: { required },
      idpessoaerp: {},
      tipopessoa: { required },
      cnpjcpf: {},
      telefone: {},
      endereco: {},
      bairro: {},
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
      this.telefone = value.telefone && !isArray(value.telefone) ? (value.telefone.length > 1 ? value.telefone.split(";") : []) : []
      this.municipio = value.municipio ? value.municipio.text : ""
    }
  }
}
</script>