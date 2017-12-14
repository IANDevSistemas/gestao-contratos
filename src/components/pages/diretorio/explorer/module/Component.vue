<template>
  <div>
    <h6>Diretórios</h6>
    <div class="row xs-gutter">
      <div v-for="(diretorio, index) in diretorios" :key="index" :class="col">
        <v-diretorio :model="diretorio" :color="value === diretorio ? 'primary' : diretorio.cor" @click="$emit('input', diretorio)" @dblclick="$emit('change', diretorio)" />
        <q-context-menu @open="$emit('input', diretorio)">
          <q-list link separator style="min-width: 200px; max-height: 300px;">
            <q-item>
              <q-item-main label="Editar" @click="$emit('edit', 'diretorio')" />
              <q-item-side icon="edit" />
            </q-item>
          </q-list>
        </q-context-menu>
      </div>
      <div :class="col">
        <v-new @click="$emit('add', 'diretorio')" />
      </div>
    </div>
    <h6>Contratos</h6>
    <div class="row xs-gutter">
      <div v-for="(contrato, index) in contratos" :key="index" :class="col">
        <v-contrato :model="contrato" :color="value === contrato ? 'primary' : ''" @click="$emit('input', contrato)" @dblclick="$emit('edit', 'contrato')" />
        <q-context-menu @open="$emit('input', contrato)">
          <q-list link separator style="min-width: 200px; max-height: 300px;">
            <q-item :to="{ name: 'contrato', params: { id: contrato.id } }">
              <q-item-main label="Editar" />
              <q-item-side icon="edit" />
            </q-item>
            <q-item :to="{ name: 'contrato.documento', params: { id: contrato.id } }">
              <q-item-main label="Documentos" />
              <q-item-side icon="attachment" />
            </q-item>
            <q-item :to="{ name: 'contrato.valor', params: { id: contrato.id } }">
              <q-item-main label="Valores" />
              <q-item-side icon="attach_money" />
            </q-item>
            <q-item :to="{ name: 'contrato.responsavel', params: { id: contrato.id } }">
              <q-item-main label="Responsáveis" />
              <q-item-side icon="people" />
            </q-item>
          </q-list>
        </q-context-menu>
      </div>
      <div :class="col">
        <v-new @click="$emit('add', 'contrato')" />
      </div>
    </div>
  </div>
</template>

<script>
import VContrato from "./Contrato"
import VDiretorio from "./Diretorio"
import VNew from "./New"
import fill from "lodash/fill"

export default {
  components: {
    VContrato,
    VDiretorio,
    VNew
  },
  props: {
    value: {
      default() {
        return {}
      }
    },
    diretorios: {
      default() {
        return []
      }
    },
    contratos: {
      default() {
        return []
      }
    }
  },
  data() {
    // const self = this
    return {
      selection: {
        contratos: [],
        diretorios: []
      }
    }
  },
  computed: {
    col() {
      return {
        "col-xs-12": true,
        "col-sm-4": true,
        "col-md-3": true,
        "col-lg-5": true,
        "col-xl-2": true
      }
    }
  },
  methods: {},
  created() {
    // Fill Selection
    this.selection.contratos = new Array(this.contratos.length)
    this.selection.diretorios = new Array(this.diretorios.length)
    fill(this.selection.contratos, "")
    fill(this.selection.diretorios, "")
  }
}
</script>


<style lang="stylus" scoped>
@import '~variables'

h6
  color $teal-6

.q-card
  user-select none /* Likely future */
  -moz-user-select none /* Firefox all */
  -ms-user-select none /* IE 10+ */
  -webkit-user-select none /* Chrome all / Safari all */
</style>
