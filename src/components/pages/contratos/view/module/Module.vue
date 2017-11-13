<template>
  <div>
    <h6>Diretórios</h6>
    <div class="row xs-gutter">
      <div v-for="(diretorio, index) in diretorios" :key="index" class="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
        <v-diretorio :model="diretorio" :color="value === diretorio ? 'primary' : ''" @click="$emit('input', diretorio)" @dblclick="$emit('change', diretorio)" />
      </div>
    </div>
    <h6>Contratos</h6>
    <div class="row xs-gutter">
      <div v-for="(contrato, index) in contratos" :key="index" class="col-xs-12 col-sm-4 col-md-4 col-lg-3 col-xl-2">
        <v-contrato :model="contrato" :color="value === contrato ? 'primary' : ''" @click="$emit('input', contrato)" @dblclick="$emit('change', contrato)" />
      </div>
    </div>
  </div>
</template>

<script>
import VContrato from "./Contrato"
import VDiretorio from "./Diretorio"
import fill from "lodash/fill"

export default {
  components: {
    VContrato,
    VDiretorio
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
</style>
