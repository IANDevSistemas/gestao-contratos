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
        <q-context-menu ref="context" @open="$emit('input', contrato)">
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
            <q-item :to="{ name: 'contrato.protocolo', params: { id: contrato.id } }">
              <q-item-main label="Protocolos" />
              <q-item-side icon="description" />
            </q-item>
            <q-item @click="move(contrato), $refs.context[index].close()">
              <q-item-main label="Mover para" />
              <q-item-side icon="folder" />
            </q-item>
          </q-list>
        </q-context-menu>
      </div>
      <div :class="col">
        <v-new @click="$emit('add', 'contrato')" />
      </div>
      <q-modal v-model="showMoveTo" position="bottom" :content-css="{minWidth: '30vw'}">
        <q-inner-loading :visible="diretorioLoading">
          <q-spinner size="50px" color="primary"></q-spinner>
        </q-inner-loading>
        <div style="text-align: center;margin: 10px;">
          <div v-if="!selectedDiretorio"> Mover: <h6>{{ contratoToMove.text }}</h6> </div>
          <div v-else>
            <q-btn @click="moveTo(contratoToMove, selectedDiretorio.id)" no-caps icon-right="send" color="tertiary" push>Mover: {{ contratoToMove.text }} para: {{ selectedDiretorio.label }}</q-btn>
          </div>
        </div>
        <q-list link separator>
          <q-list-header inset>
            <div class="row">
              <div class="col-2" v-if="diretoriosToMove.length > 0 && diretoriosToMove[0].iddiretoriopai > 0">
                <q-btn @click="backDiretorioToMove()" icon="reply" color="primary" small push flat></q-btn>
              </div>
              <div class="col">
                {{ diretorio }}
              </div>
            </div>
          </q-list-header>
          <q-item v-for="(diretorio, index) in diretoriosToMove" :key="index" highlight @dblclick="onDbClickDiretorio(diretorio.id)" @click="selectedDiretorio = diretorio">
            <q-item-side icon="folder" :color="value === diretorio ? 'primary' : diretorio.cor" />
            <q-item-main>
              <q-item-tile label> {{ diretorio.label }} </q-item-tile>
            </q-item-main>
            <q-item-side right>
              <div class="row xs-gutter">
                <div class="col" v-if="diretorio.countfilho > 0">
                  <q-chip small color="secondary"> {{ diretorio.countfilho }} </q-chip>
                </div>
                <div class="col">
                  <q-radio v-model="selectedDiretorio" :val="diretorio" />
                </div>
              </div>
            </q-item-side>
          </q-item>
        </q-list>
      </q-modal>
    </div>
  </div>
</template>

<script>
import VContrato from "./Contrato"
import VDiretorio from "./Diretorio"
import VNew from "./New"
import fill from "lodash/fill"
import services from "service/all"

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
      },

      diretorio: "Diretórios",
      diretoriosToMove: [],
      showMoveTo: false,
      contratoToMove: { text: "" },
      selectedDiretorio: null,
      diretorioLoading: false
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
  methods: {
    move(contrato) {
      this.showMoveTo = true
      this.contratoToMove = contrato
      this.selectedDiretorio = null
      this.refreshDiretoriosToMove()
    },
    refreshDiretoriosToMove(id) {
      this.diretorioLoading = true
      services.diretorio
        .get({
          params: {
            iddiretoriopai: id || 0
          }
        })
        .then(({ data }) => {
          if (data.data.length > 0) {
            this.diretoriosToMove = data.data
            const path = this.diretoriosToMove[0].path.split("/")
            if (path.length > 1 && JSON.parse(path[path.length - 1]).iddiretoriopai != null) {
              this.diretorio = JSON.parse(path[path.length - 2]).descricao
            } else {
              this.diretorio = "Diretórios"
            }
          }
          this.diretorioLoading = false
        })
        .catch(error => {
          console.error(error)
          this.diretorioLoading = false
        })
    },
    onDbClickDiretorio(id) {
      this.refreshDiretoriosToMove(id)
    },
    backDiretorioToMove() {
      const path = this.diretoriosToMove[0].path.split("/")
      const id = JSON.parse(path[path.length - 2]).iddiretoriopai
      this.refreshDiretoriosToMove(id)
    },
    moveTo(contrato, iddiretorio) {
      this.diretorioLoading = true
      contrato.iddiretorio = iddiretorio
      services.contrato
        .put({
          id: contrato.id,
          model: JSON.stringify(contrato)
        })
        .then(({ data }) => {
          this.diretorioLoading = false
          this.showMoveTo = false
          this.$root.$emit("refresh")
        })
        .catch(error => {
          console.error(error)
          this.diretorioLoading = false
        })
    }
  },
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
