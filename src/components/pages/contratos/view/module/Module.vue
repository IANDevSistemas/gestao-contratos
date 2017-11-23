<template>
  <div>
    <h6>Diretórios</h6>
    <div class="row xs-gutter">
      <div v-for="(diretorio, index) in diretorios" :key="index" class="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
        <v-diretorio :model="diretorio" :color="value === diretorio ? 'primary' : diretorio.cor" @click="$emit('input', diretorio)" @dblclick="$emit('change', diretorio)" />
        <q-context-menu @open="$emit('input', diretorio)">
          <q-list link separator style="min-width: 150px; max-height: 300px;">
            <q-item>
              <q-item-main label="Editar" @click="$emit('edit', diretorio)" />
            </q-item>
          </q-list>
        </q-context-menu>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
        <v-new @click="$emit('add', 'diretorio')" />
      </div>
    </div>
    <h6>Contratos</h6>
    <div class="row xs-gutter">
      <div v-for="(contrato, index) in contratos" :key="index" class="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
        <v-contrato :model="contrato" :color="value === contrato ? 'primary' : ''" @click="$emit('input', contrato)" @dblclick="$emit('edit', contrato)" />
        <q-context-menu @open="$emit('input', contrato)">
          <q-list link separator style="min-width: 150px; max-height: 300px;">
            <q-item>
              <q-item-main label="Editar" @click="$emit('edit', contrato)" />
            </q-item>
          </q-list>
        </q-context-menu>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
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
