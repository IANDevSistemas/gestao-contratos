<template>
  <section>
    <form @submit.stop.prevent="$emit('submit', value)">
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-6">
          <!-- Código -->
          <q-field>
            <q-input v-model.trim="value.idcontrato" v-mask="'################'" float-label="Código" />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <!-- Número -->
          <q-field>
            <q-input v-model.trim="value.numero" float-label="Número" />
          </q-field>
        </div>
      </div>

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
      <label>Data Inicial</label>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-6">
          <!-- Min Data Inicial -->
          <q-field>
            <q-datetimepicker v-model="value.mindatainicial" float-label="Maior que" />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <!-- Max Data Inicial -->
          <q-field>
            <q-datetimepicker v-model="value.maxdatainicial" float-label="Menor que" />
          </q-field>
        </div>
      </div>
      <label>Data Final</label>
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <!-- Min Data Final -->
          <q-field>
            <q-datetimepicker v-model="value.mindatafinal" float-label="Maior que" />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <!-- Max Data Final -->
          <q-field>
            <q-datetimepicker v-model="value.maxdatafinal" float-label="Menor que" />
          </q-field>
        </div>
      </div>

      <h6>Data Renovação</h6>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-6">
          <!-- Data Inicial -->
          <q-field>
            <q-datetimepicker v-model="value.mindatarenovacao" float-label="Maior que" />
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6">
          <!-- Data Final -->
          <q-field>
            <q-datetimepicker v-model="value.maxdatarenovacao" float-label="Menor que" />
          </q-field>
        </div>
      </div>
      <q-toolbar inverted>
        <q-btn type="submit" color="primary" icon-right="search">Buscar</q-btn>
        <q-btn flat color=" negative " icon-right="clear " @click="$emit( 'input', {}) ">Limpar</q-btn>
        <div class="q-toolbar-title "></div>
      </q-toolbar>
    </form>
  </section>
</template>

<script>
import AbstractFilter from "@/abstract/crud/filter"
export default {
  extends: AbstractFilter,
  methods: {}
}
</script>

<style lang="stylus" scoped>
</style>
