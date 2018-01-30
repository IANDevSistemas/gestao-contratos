<template>
  <section>
    <form @submit.stop.prevent="filter">
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-4">
          <!-- Descrição -->
          <q-field :count="255">
            <q-input v-model.trim="value.descritivo" float-label="Descritivo" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
            <!-- Protocolo -->
            <q-field>
              <q-input v-model.trim="value.protocolo" float-label="Protocolo"></q-input>
            </q-field>
        </div>

        <div class="col-xs-12 col-sm-2">
            <!-- Situação -->
            <q-field>
              <q-select v-model="value.situacao" float-label="Situação" :options="[ { value: 'P', label: 'Pendente' }, { value: 'R', label: 'Resolvido' } ]" />
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
