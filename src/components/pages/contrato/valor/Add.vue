<template>
  <section>
    <div class="row sm-gutter" :style="{ margin: 'auto', width: '95%' }">
      <div class="col-xs-12 col-sm-6">
        <!-- Período -->
        <q-field dark :error="$v.form.to.$error || $v.form.from.$error" error-label="Selecione um período válido">
          <label>Período</label>
          <q-datetimepicker-range type="date" v-model.lazy="form" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Dia -->
        <q-field :error="$v.form.day.$error" error-label="Dia deve ser maior que 0">
          <q-input v-model.lazy="form.day" float-label="Dia Vencimento" align="right" v-money="{ precision: 0 }" @blur="$v.form.day.$touch" />
        </q-field>
      </div>
      <div class="col-xs-12 col-sm-3">
        <!-- Valor -->
        <q-field :error="$v.form.value.$error" error-label="Valor deve ser maior que 0">
          <q-input v-model.lazy="form.value" float-label="Valor" align="right" v-money @blur="$v.form.value.$touch" />
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

    <vuetable ref="table" :api-mode="false" :fields="fields" table-height="calc(100vh - 250px)" :class="{ 'bordered': true, 'striped': true, 'highlight': true, 'responsive': true, 'q-table': true }" pagination-path="">
      <template slot="datavencimento" slot-scope="props">
        <q-datetimepicker v-model="props.rowData.datavencimento" type="date" class="text-right" :readonly="props.rowData.id" />
      </template>
      <template slot="valor" slot-scope="props">
        <input v-model.lazy="props.rowData.valor" class="text-right" v-money :readonly="props.rowData.id" />
      </template>
      <template slot="actions" slot-scope="props">
        <q-toolbar v-if="!props.rowData.id" class="compact" inverted>
          <q-spinner v-show="props.rowData.isSaving" />
          <q-btn v-show="!props.rowData.isSaving" round small flat icon="delete_forever" @click="onAction('delete', props.rowData, props.rowIndex)">
            <q-tooltip>Remover</q-tooltip>
          </q-btn>
          <q-btn v-show="!props.rowData.isSaving" round small flat icon="save" @click="onAction('save', props.rowData, props.rowIndex)">
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
      form: {
        from: "",
        to: "",
        groupBy: 2,
        value: 0,
        day: 1
      },
      baseURL,
      contrato: {},
      list: [],
      fields: [
        { name: "datareferenciainicial", sortField: "datareferenciainicial", title: "Ref. Inicio", callback: "dateFormatter", width: "160px" },
        { name: "datareferenciafinal", sortField: "datareferenciafinal", title: "Ref. Fim", callback: "dateFormatter", width: "160px" },
        { name: "__slot:datavencimento", sortField: "datavencimento", title: "Vencimento", width: "160px" },
        { name: "__slot:valor", sortField: "valor", title: "Valor (R$)", width: "200px" },
        { name: "situacao", sortField: "situacao", title: "Situação", callback: "situacaoFormatter", width: "100px" },
        { name: "__slot:actions", title: "", width: "100px" }
      ]
    }
  },
  validations: {
    form: {
      from: { required },
      to: { required },
      groupBy: { required },
      value: { required },
      day: { required }
    }
  },
  methods: {
    onAction(action, item, index) {
      switch (action) {
        case "delete":
          this.list.splice(index, 1)
          break
        case "save":
          Vue.set(item, "isSaving", true)
          services.contratoValor
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
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        return
      }
      const args = merge({}, { params: { idcontrato: this.idcontrato || 0, ...this.form } })
      services.contratoValorAdicionar
        .get(args)
        .then(({ data }) => {
          this.list = data
        })
        .catch(error => {
          // TODO add some message
          console.error(error)
        })
    }, 500)
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
