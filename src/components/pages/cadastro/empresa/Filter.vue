<template>
  <section>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-4">
        <!-- Razão Social -->
        <q-field :count="255">
          <q-input v-model.trim="value.nomerazaosocial" float-label="Razão Social" />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-4">
        <!-- Apelido -->
        <q-field :count="255">
          <q-input v-model.trim="value.apelido" float-label="Apelido"></q-input>
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-2">
        <!-- CNPJ / CPF -->
        <q-field>
          <q-input v-model.trim="value.cnpjcpf" align="right" float-label="CNPJ / CPF" type="tel" v-mask="[ '###.###.###-##', '##.###.###/####-##' ]" />
        </q-field>
      </div>

      <div class="col-xs-12 col-sm-2">
        <crud-filter-actions @filter="$emit('input', JSON.parse(JSON.stringify(value)))" @clear="$emit('input', {})" />
      </div>
    </div>
  </section>
</template>

<script>
import AbstractFilter from "@/abstract/crud/filter"
export default {
  extends: AbstractFilter
}
</script>

