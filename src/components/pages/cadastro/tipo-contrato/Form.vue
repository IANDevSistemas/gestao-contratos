<template>
  <section>
    <crud-form-actions @back="$emit('back')" @copy="() => { value.id = null }" @clear="$emit('input', {})" @save="$emit('save')" @delete="$emit('delete')" />

    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-2">
        <!-- Id -->
        <q-field>
          <q-input v-model.trim="value.id" float-label="Cód." align="right" readonly></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-8">
        <!-- Descrição -->
        <q-field :error="$v.value.descricao.$error" error-label="Entre com um valor válido" :count="255">
          <q-input v-model.trim="value.descricao" float-label="Descrição" @blur="$v.value.descricao.$touch"></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-2">
        <!-- Situação -->
        <q-field :error="$v.value.situacao.$error" error-label="Entre com um valor válido">
          <q-select v-model="value.situacao" float-label="Situação" :options="[ { value: 'A', label: 'Ativo' }, { value: 'I', label: 'Inativo' } ]" />
        </q-field>
      </div>
    </div>

  </section>
</template>

<script>
import Form from "@/abstract/crud/form"
import { required } from "vuelidate/lib/validators"

export default {
  extends: Form,
  validations: {
    value: {
      descricao: { required },
      situacao: { required }
    }
  }
}
</script>