<template>
  <section>
    <div class="row sm-gutter" :style="{ margin: 'auto', width: '98%' }">
      <div class="col-xs-12 col-sm-2">
        <!-- Nome -->
        <q-field>
          <q-input v-model="form.nome" float-label="Nome" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-2">
        <!-- Tipo -->
        <q-field>
          <q-select v-model="form.tipopessoa" float-label="Tipo" clearable :options="[ { value: 'F', label: 'Fornecedor' }, { value: 'C', label: 'Cliente' }, { value: 'U', label: 'Usuário' } ]" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-2">
        <!-- Cód ERP -->
        <q-field>
          <q-input v-model="form.idpessoaerp" float-label="Cód. ERP" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Tipo Responsável -->
        <q-field>
          <q-select v-model="form.idtiporesponsavelcontrato" radio filter clearable float-label="Tipo Responsável" filter-placeholder="Filtro..." :options="options.tiporesponsavelcontrato" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Função -->
        <q-field>
          <q-input v-model="form.funcao" float-label="Função" />
        </q-field>
      </div>
    </div>

    <q-toolbar>
      <q-toolbar-title/>
      <q-btn flat round small @click="refresh()" icon="loop">
        <q-tooltip>Gerar Novamente</q-tooltip>
      </q-btn>
      <q-btn flat round small @click="saveAll()" icon="save">
        <q-tooltip>Salvar Todos</q-tooltip>
      </q-btn>
    </q-toolbar>
    </div>
    <vuetable ref="table" :api-mode="false" :fields="fields" table-height="calc(100vh - 250px)" :class="{ 'bordered': true, 'striped': true, 'highlight': true, 'responsive': true, 'q-table': true }" pagination-path="">
      <template slot="idtiporesponsavelcontrato" slot-scope="props">
        <!-- Tipo Responsável -->
        <q-field v-if="!props.rowData.id" class="compact">
          <q-select v-model="props.rowData.idtiporesponsavelcontrato" radio filter clearable filter-placeholder="Filtro..." :options="options.tiporesponsavelcontrato" />
        </q-field>
        <span v-else>{{props.rowData.tiporesponsavelcontrato.text}}</span>
      </template>
      <template slot="funcao" slot-scope="props">
        <q-field class="compact">
          <input v-model="props.rowData.funcao" :readonly="props.rowData.id" />
        </q-field>
      </template>
      <template slot="actions" slot-scope="props">
        <q-toolbar v-if="!props.rowData.id" class="compact" inverted>
          <q-spinner v-show="props.rowData.isSaving" />
          <q-btn v-show="!props.rowData.isSaving" round small flat icon="delete_forever" @click="onAction('delete', props.rowData, props.rowIndex)">
            <q-tooltip>Remover</q-tooltip>
          </q-btn>
          <q-btn v-show="!props.rowData.isSaving" round small flat :disable="!props.rowData.idtiporesponsavelcontrato" icon="save" @click="onAction('save', props.rowData, props.rowIndex)">
            <q-tooltip>Salvar</q-tooltip>
          </q-btn>
        </q-toolbar>
      </template>
    </vuetable>

  </section>
</template>

<script>
import Vue from "vue"
import Vuetable from "vuetable-2"
import { baseURL } from "service/config"
import debounce from "lodash/debounce"
import isNumber from "lodash/isNumber"
import kebabCase from "lodash/kebabCase"
import merge from "lodash/merge"
import moment from "moment"
import numeral from "numeral"
import { required } from "vuelidate/lib/validators"
import services from "service/all"

let refresh

export default {
  components: {
    Vuetable
  },
  props: {
    idcontrato: {
      default: 0
    }
  },
  data() {
    return {
      form: {},
      options: {
        tiporesponsavelcontrato: []
      },
      baseURL,
      contrato: {},
      list: [],
      fields: [
        { name: "nomerazaosocial", sortField: "nomerazaosocial", title: "Razão Social", width: "280px" },
        { name: "nomefantasia", sortField: "nomefantasia", title: "Nome Fantasia", width: "280px" },
        { name: "__slot:funcao", sortField: "funcao", title: "Função", width: "180px" },
        { name: "__slot:idtiporesponsavelcontrato", sortField: "idtiporesponsavelcontrato", title: "Tipo Responsável", width: "220px" },
        { name: "__slot:actions", title: "", width: "100px" }
      ]
    }
  },
  methods: {
    onAction(action, item, index) {
      switch (action) {
        case "delete":
          this.list.splice(index, 1)
          break
        case "save":
          // Validation
          if (!item.idtiporesponsavelcontrato) {
            return
          }
          Vue.set(item, "isSaving", true)
          services.contratoResponsavel
            .post({ model: JSON.stringify(item) })
            .then(({ data }) => {
              Vue.set(item, "isSaving", false)
              Vue.set(item, "id", data.msg)
            })
            .catch(error => {
              console.error(error)
              Vue.set(item, "isSaving", false)
            })
          break
      }
    },
    saveAll() {
      for (let i = 0, l = this.list.length; i < l; i++) {
        const item = this.list[i]
        if (!item.id) {
          this.onAction("save", item, i)
        }
      }
    },
    refresh() {
      refresh()
    },
    dateFormatter(value) {
      const date = moment(value)
      return date.isValid() ? date.format("DD/MM/YYYY") : ""
    },
    numberFormatter(value) {
      return isNumber(value) ? numeral(value).format("$ 0,0.00") : "-"
    },
    situacaoFormatter(value) {
      return ["Ativo", "Inativo"]["AI".indexOf(value)]
    }
  },
  created() {
    refresh = debounce(() => {
      const args = merge({}, { params: { idcontrato: this.idcontrato || 0, ...this.form } })
      services.contratoResponsavelAdicionar
        .get(args)
        .then(({ data }) => {
          this.list = data
        })
        .catch(error => {
          // TODO add some message
          console.error(error)
        })
    }, 500)
    refresh()

    services.tipoResponsavelContrato
      .get({ params: { situacao: "A" } })
      .then(({ data }) => {
        this.options.tiporesponsavelcontrato = data.data
      })
      .catch(error => {
        // TODO add some message
        console.error(error)
      })
  },
  watch: {
    list(value) {
      this.$refs.table.resetData()
      // this.$refs.table.refresh()
      this.$refs.table.setData(value)
      // this.$refs.table.refresh()
    },
    form: {
      handler() {
        this.refresh()
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  margin auto
  // padding 12px 32px
  width 100%

.q-datetimepicker-range
  padding-top 10px

.q-field.compact
  margin 0
  padding 0

.q-toolbar.compact
  min-height 0
  padding 0

  button
    height 32px
    margin 0
    padding 0
    width 32px

.q-if
  margin-bottom 0
  margin-top 0
  padding-bottom 0

table
  width 100%

label
  font-size 12px
  height 12px
  position absolute

input
  background-color #ffffff00

  &[readonly]
    border-style none
</style>
