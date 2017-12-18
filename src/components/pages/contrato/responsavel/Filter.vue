<template>
  <section>
    <form @submit.stop.prevent="filter">
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-4">
          <!-- Pessoa -->
          <q-field>
            <q-input v-model="value.pessoa" float-label="Pessoa" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-3">
          <!-- Função -->
          <q-field>
            <q-input v-model="value.funcao" float-label="Função" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-3">
          <!-- Tipo Responsável -->
          <q-field>
            <q-input v-model="value.tiporesponsavelcontrato" float-label="Tipo Responsável" />
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

