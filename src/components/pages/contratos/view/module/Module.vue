<template>
  <div>
    <h3>Diretórios</h3>
    <div class="row sm-gutter">
      <div v-for="(diretorio, index) in diretorios" :key="index" class="col-3">
        <v-diretorio :model="diretorio" v-model="selection.diretorios[index]" />
      </div>
    </div>
    <h3>Contratos</h3>
    <div class="row sm-gutter">
      <div v-for="(contrato, index) in contratos" :key="index" class="col-3">
        <v-contrato :model="contrato" v-model="selection.contratos[index]" />
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
    const self = this
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
h3
  font-size 1em
</style>
