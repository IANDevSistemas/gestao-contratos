<template>
  <form>
    <!-- Descrição -->
    <q-field>
      <q-input v-model.trim="value.descricao" float-label="Descrição" />
    </q-field>

    <!-- Conteúdo -->
    <q-field>
      <q-input v-model.trim="value.conteudo" float-label="Conteúdo" />
    </q-field>

    <!-- Pessoa -->
    <q-field>
      <q-input v-model="autocomplete.pessoa" float-label="Contratante / Contratado">
        <q-autocomplete @search="services.pessoa.search" @selected="(value) => { autocompleteSelected('pessoa', value) }" />
      </q-input>
    </q-field>

    <h6>Vigência</h6>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-6">
        <label>Data Inicial</label>
      </div>
      <div class="col-xs-12 col-sm-6">
        <label>Data Final</label>
      </div>
    </div>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-3">
        <!-- Min Data Inicial -->
        <q-field>
          <q-datetime v-model="value.mindatainicial" format="DD/MM/YYYY" float-label="Maior que" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Max Data Inicial -->
        <q-field>
          <q-datetime v-model="value.maxdatainicial" format="DD/MM/YYYY" float-label="Menor que" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Min Data Final -->
        <q-field>
          <q-datetime v-model="value.mindatafinal" format="DD/MM/YYYY" float-label="Maior que" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Max Data Final -->
        <q-field>
          <q-datetime v-model="value.maxdatafinal" format="DD/MM/YYYY" float-label="Menor que" />
        </q-field>
      </div>
    </div>

    <h6>Data Renovação</h6>
    <div class="row sm-gutter">
      <div class="col-xs-12 col-sm-6">
        <!-- Data Inicial -->
        <q-field>
          <q-datetime v-model="value.mindatarenovacao" float-label="Maior que" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-6">
        <!-- Data Final -->
        <q-field>
          <q-datetime v-model="value.maxdatarenovacao" float-label="Menor que" />
        </q-field>
      </div>
    </div>
  </form>
</template>

<script>
import AbstractFilter from "@/abstract/crud/filter"
import services from "service/all"
export default {
  extends: AbstractFilter,
  computed: {
    services() {
      return services
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>
