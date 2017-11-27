<template>
  <section>
    <crud-form-actions :title="value.id  ? 'Alterando #' + value.id : 'Incluindo'" @back="$router.go(-1)" @copy="() => { value.id = null }" @clear="value = {}" @save="onSave()" @delete="onDelete()" />

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-8">
        <!-- Nome Fantasia -->
        <q-field :error="$v.value.nomefantasia.$error" error-label="Entre com um valor válido" :count="255">
          <q-input v-model.trim="value.nomefantasia" float-label="Nome Fantasia" @blur="$v.value.nomefantasia.$touch"></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-2">
        <!-- Situação -->
        <q-field :error="$v.value.situacao.$error" error-label="Entre com um valor válido">
          <q-select v-model="value.situacao" float-label="Situação" :options="[ { value: 'A', label: 'Ativo' }, { value: 'I', label: 'Inativo' } ]" />
        </q-field>
      </div>
    </div>

    <!-- Nome Razão Social -->
    <q-field :error="$v.value.nomerazaosocial.$error" error-label="Entre com um valor válido" :count="255">
      <q-input v-model.trim="value.nomerazaosocial" float-label="Razão Social" @blur="$v.value.nomerazaosocial.$touch"></q-input>
    </q-field>

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-8">
        <!-- Cód ERP -->
        <q-field :error="$v.value.idpessoaerp.$error" error-label="Entre com um valor válido" :count="255">
          <q-input v-model.trim="value.idpessoaerp" float-label="Cód ERP" @blur="$v.value.idpessoaerp.$touch"></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- Tipo -->
        <q-field :error="$v.value.tipopessoa.$error" error-label="Entre com um valor válido">
          <q-select v-model="value.tipopessoa" float-label="Tipo" :options="[ { value: 'F', label: 'Fornecedor' }, { value: 'C', label: 'Cliente' }, { value: 'U', label: 'Usuário' } ]" />
        </q-field>
      </div>
    </div>

  </section>
</template>

<script>
import AbstractForm from "@/abstract/crud/form"
import { computed } from "@/abstract/util/mixins"
import { required } from "vuelidate/lib/validators"

export default {
  extends: AbstractForm,
  ...computed({
    serviceName: "pessoa"
  }),
  validations: {
    value: {
      nomefantasia: { required },
      situacao: { required },
      nomerazaosocial: { required },
      idpessoaerp: {},
      tipopessoa: { required }
    }
  }
}
</script>