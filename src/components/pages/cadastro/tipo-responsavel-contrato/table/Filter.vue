<template>
  <section>
    <form @submit.prevent.stop="$emit('input', JSON.parse(JSON.stringify(value)))">
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-6">
          <!-- Descrição -->
          <q-field :count="255">
            <q-input v-model.trim="value.descricao" float-label="Descrição" />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-2">
          <!-- Aprovador -->
          <q-field>
            <q-select v-model="value.aprovador" float-label="Aprovador" :options="[ { value: 'S', label: 'Sim' }, { value: 'N', label: 'Não' } ]" />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-2">
          <!-- Situação -->
          <q-field>
            <q-select v-model="value.situacao" float-label="Situação" :options="[ { value: 'A', label: 'Ativo' }, { value: 'I', label: 'Inativo' } ]" />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-2">
          <crud-filter-actions @filter="filter" @clear="clear" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import AbstractFilter from "@/abstract/crud/filter"
export default {
  extends: AbstractFilter
}
</script>