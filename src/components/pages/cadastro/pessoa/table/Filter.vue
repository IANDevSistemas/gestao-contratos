<template>
  <section>
    <form>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-4">
          <!-- Razão Social -->
          <q-field>
            <q-input v-model.trim="value.nomerazaosocial" float-label="Razão Social" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Nome Fantasia -->
          <q-field>
            <q-input v-model.trim="value.nomefantasia" float-label="Nome Fantasia"></q-input>
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-2">
          <!-- CNPJ / CPF -->
          <q-field>
            <q-checkbox v-model="situacao" val="A" label="Ativo" />
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
  extends: AbstractFilter,
  data() {
    return {
      situacao: true
    }
  },
  watch: {
    situacao(value) {
      this.value.situacao = value
    }
  }
}
</script>

