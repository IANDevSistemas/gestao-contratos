<template>
  <section>
    <crud-form-actions :title="value.id  ? 'Alterando #' + value.id : 'Incluindo'" @back="$router.go(-1)" @copy="() => { value.id = null }" @clear="value = {}" @save="onSave()" @delete="onDelete()" />

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-12">
        <!-- Descrição -->
        <q-field :error="$v.value.descricao.$error" error-label="Entre com um valor válido" :count="255">
          <q-input v-model.trim="value.descricao" float-label="Descrição" @blur="$v.value.descricao.$touch"></q-input>
        </q-field>
      </div>
    </div>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-6">
        <!-- Aprovador -->
        <q-field :error="$v.value.aprovador.$error" error-label="Entre com um valor válido">
          <q-select v-model="value.aprovador" float-label="Aprovador" :options="[ { value: 'S', label: 'Sim' }, { value: 'N', label: 'Não' } ]" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6">
        <!-- Situação -->
        <q-field :error="$v.value.situacao.$error" error-label="Entre com um valor válido">
          <q-select v-model="value.situacao" float-label="Situação" :options="[ { value: 'A', label: 'Ativo' }, { value: 'I', label: 'Inativo' } ]" />
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
    serviceName: "tipoResponsavelContrato"
  }),
  validations: {
    value: {
      descricao: { required },
      aprovador: { required },
      situacao: { required }
    }
  }
}
</script>