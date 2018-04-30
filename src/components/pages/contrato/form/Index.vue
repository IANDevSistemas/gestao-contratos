<template>
  <section>
    <section>
      <crud-form-actions title="" @back="$router.go(-1)" @copy="() => { value.id = null }" @clear="value = {}" @save="onSave()" @delete="onDelete()" />

      <!-- Descrição -->
      <q-field :error="$v.value.descricao.$error" error-label="Entre com uma descrição válida" :count="255">
        <q-input v-model.trim="value.descricao" float-label="Descrição" @blur="$v.value.descricao.$touch"></q-input>
      </q-field>

      <!-- Toolbar -->
      <q-toolbar v-show="value.id">
        <q-btn flat @click="$router.push({ name: 'contrato.documento' })">
          Documentos
        </q-btn>
        <q-btn flat @click="$router.push({ name: 'contrato.valor' })">
          Valores
        </q-btn>
        <q-btn flat @click="$router.push({ name: 'contrato.unidade' })">
          Unidades
        </q-btn>
        <!-- <q-btn flat @click="$router.push({ name: 'contrato.responsavel' })"> -->
        <!-- Responsáveis -->
        <!-- </q-btn> -->
        <q-btn flat @click="$router.push({ name: 'contrato.protocolo' })">
          Protocolos
        </q-btn>
        <!-- <q-btn flat @click="$router.push({ name: 'contrato.aprovacao' })"> -->
        <!-- Aprovações -->
        <!-- </q-btn> -->
      </q-toolbar>

      <!-- Pessoa -->
      <q-field :error="$v.value.pessoa.$error" error-label="Selecione um valor">
        <q-input v-model="autocomplete.pessoa" float-label="Contratante / Contratado" @blur="$v.value.pessoa.$touch">
          <q-autocomplete @search="services.pessoa.search" @selected="(value) => { autocompleteSelected('pessoa', value) }" />
        </q-input>
      </q-field>

      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-5">
          <!-- Tipo Contrato -->
          <q-field :error="$v.value.idtipocontrato.$error" error-label="Selecione um valor">
            <q-select v-model="value.idtipocontrato" filter clearable float-label="Tipo Contrato" radio :options="options.tipocontrato" @blur="$v.value.idtipocontrato.$touch" />
          </q-field>
        </div>

        <!-- Índice -->
        <div class="col-xs-12 col-sm-5">
          <q-field :error="$v.value.idindiceatualizacao.$error" error-label="Selecione um valor">
            <q-select v-model="value.idindiceatualizacao" filter clearable float-label="Índice" radio :options="options.indice" @blur="$v.value.idindiceatualizacao.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-2">
          <!-- Número -->
          <q-field :error="$v.value.numero.$error" error-label="Entre com um número válido">
            <q-input v-model.trim="value.numero" float-label="N°" @blur="$v.value.numero.$touch"></q-input>
          </q-field>
        </div>
      </div>

      <h6>Vigência</h6>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-4">
          <!-- Data Inicial -->
          <q-field :error="$v.value.datainicial.$error" error-label="Inválida">
            <q-datetimepicker type="date" :max="value.datafinal" v-model.trim="value.datainicial" float-label="Data Inicial" @blur="$v.value.datainicial.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Data Final -->
          <q-field :error="$v.value.datafinal.$error" error-label="Inválida">
            <q-datetimepicker type="date" :min="value.datainicial" v-model.trim="value.datafinal" float-label="Data Final" @blur="$v.value.datafinal.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Data Próxima Renovação -->
          <q-field :error="$v.value.dataproximarenovacao.$error" error-label="Inválida">
            <q-datetimepicker type="date" :min="value.datainicial" v-model.trim="value.dataproximarenovacao" float-label="Próxima Renovação" @blur="$v.value.dataproximarenovacao.$touch" />
          </q-field>
        </div>
      </div>

      <h6>Vencimento</h6>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-4">
          <!-- Dia Vencimento Inicial -->
          <q-field :error="$v.value.diavencimentoinicial.$error" error-label="Valor deve estar entre 1 e 31">
            <q-input v-model="value.diavencimentoinicial" align="right" v-money="{ precision: 0 }" float-label="Dia Vencimento Inicial" @blur="$v.value.diavencimentoinicial.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Dia Vencimento Final -->
          <q-field :error="$v.value.diavencimentofinal.$error" error-label="Valor deve estar entre 1 e 31">
            <q-input v-model="value.diavencimentofinal" align="right" v-money="{ precision: 0 }" float-label="Dia Vencimento Final" @blur="$v.value.diavencimentofinal.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Dia Limite Questionamento -->
          <q-field :error="$v.value.dialimitequestionamento.$error" error-label="Valor deve estar entre 0 e 31">
            <q-input v-model="value.dialimitequestionamento" align="right" v-money="{ precision: 0 }" float-label="Dia Limite Questionamento" @blur="$v.value.dialimitequestionamento.$touch" />
          </q-field>
        </div>
      </div>

      <h6>Multa</h6>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-4">
          <!-- Multa Atraso Percentual -->
          <q-field :error="$v.value.multapercentualatraso.$error" error-label="Valor deve ser maior que 0">
            <q-input v-model="value.multapercentualatraso" align="right" v-money="{ precision: 3, suffix: ' %' }" float-label="Multa Atraso Percentual" @blur="$v.value.multapercentualatraso.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Valor Multa Atraso -->
          <q-field :error="$v.value.multavaloratraso.$error" error-label="Valor deve ser maior que R$ 0,00">
            <q-input v-model="value.multavaloratraso" align="right" v-money="{ prefix: 'R$ ' }" float-label="Valor Multa Atraso" @blur="$v.value.multavaloratraso.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Dias Tolerancia Multa -->
          <q-field :error="$v.value.diastoleranciamulta.$error" error-label="Valor deve ser maior que 0">
            <q-input v-model="value.diastoleranciamulta" align="right" v-money="{ precision: 0 }" float-label="Dias Tolerância Multa" @blur="$v.value.diastoleranciamulta.$touch" />
          </q-field>
        </div>
      </div>

      <h6>Distrato</h6>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-4">
          <!-- Multa Valor Distrato -->
          <q-field :error="$v.value.multavalordistrato.$error" error-label="Valor deve ser maior que 0">
            <q-input v-model="value.multavalordistrato" align="right" v-money="{ prefix: 'R$ ' }" float-label="Multa" @blur="$v.value.multavalordistrato.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Tipo Multa Distrato -->
          <q-field :error="$v.value.tipomultadistrato.$error" error-label="Selecione um valor">
            <q-select v-model="value.tipomultadistrato" clearable float-label="Tipo Multa" :options="[ { value: 'F', label: 'Fixa' }, { value: 'P', label: 'Proporcional' } ]" @blur="$v.value.tipomultadistrato.$touch" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-4">
          <!-- Data Distrato Sem Multa -->
          <q-field :error="$v.value.datadistratosemmulta.$error" error-label="Inválida">
            <q-datetimepicker type="date" :min="value.datadistratosemmulta" v-model.trim="value.datadistratosemmulta" float-label="Data Máxima Sem Multa" @blur="$v.value.datadistratosemmulta.$touch" />
          </q-field>
        </div>
      </div>
    </section>

    <!-- Objeto do contrato -->
    <section v-show="value.id">
      <q-toolbar inverted>
        <q-btn flat small @click="editValue('Editar Objeto do Contrato', 'objetocontrato')">
          <q-icon name="mode_edit" />
        </q-btn>
        <q-toolbar-title>
          Objeto do Contrato
        </q-toolbar-title>
      </q-toolbar>
      <div v-html="value.objetocontrato"></div>
    </section>

    <!-- Condições Pagamento -->
    <section v-show="value.id">
      <q-toolbar inverted>
        <q-btn flat small @click="editValue('Editar Condições de Pagamento', 'condicoespagamento')">
          <q-icon name="mode_edit" />
        </q-btn>
        <q-toolbar-title>
          Condições de Pagamento
        </q-toolbar-title>
      </q-toolbar>
      <div v-html="value.condicoespagamento"></div>
    </section>

    <!-- Condições Renovação -->
    <section v-show="value.id">
      <q-toolbar inverted>
        <q-btn flat small @click="editValue('Editar Condições de Renovação', 'condicoesrenovacao')">
          <q-icon name="mode_edit" />
        </q-btn>
        <q-toolbar-title>
          Condições de Renovação
        </q-toolbar-title>
      </q-toolbar>
      <div v-html="value.condicoesrenovacao"></div>
    </section>

    <!-- Scroll -->
    <q-fixed-position corner="bottom-right" :offset="[25, 25]">
        <q-btn round color="primary" icon="keyboard_arrow_up" class="animate-pop" v-back-to-top.animate="{ offset: 200, duration: 200 }"/>
    </q-fixed-position>

    <!-- Modal -->
    <q-modal ref="modalEditor" maximized :content-css="{ width: '60vw', height: '500px' }" @close="modalEditorOnClose">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn flat @click="$refs.modalEditor.close()">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            {{editor.title}}
          </q-toolbar-title>
        </q-toolbar>
        <vue-html5-editor :height="350" :content="editor.content" @change="editorOnChange" :auto-height="false" />
        <q-toolbar slot="footer">
          <q-btn flat @click="modalEditorOnApply" icon="check">
            Aplicar
          </q-btn>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
    <!-- /Modal -->
    <crud-form-modal ref="modal" />
  </section>
</template>

<script>
import { between, minValue, required } from "vuelidate/lib/validators"
import { Toast } from "quasar"

import AbsctractCrudForm from "@/abstract/crud/form"
import Vue from "vue"
import VueHtml5Editor from "vue-html5-editor"
import { baseURL } from "service/config"
import { computed } from "@/abstract/util/mixins"

// ID do contrato deve ser passado de forma dinamica então é criado um encapsulador
let id = ""
function Id() {
  // It is not an empty function
}
Id.prototype.toString = function () {
  return `${id}`
}

// const dialogBlock = {
//   nobuttons: true,
//   progress: {
//     indeterminate: true
//   },
//   noBackdropDismiss: true,
//   noEscDismiss: true
// }

export default {
  extends: AbsctractCrudForm,
  components: {
    VueHtml5Editor: new VueHtml5Editor({
      // language: "pt-br",
      image: {
        upload: {
          url: `${baseURL}?action=execTarefa&apelido=GESTAOCONTRATOS-service-contrato-documento-arquivo-upload&_fileUploadConvertCharset=UTF-8&tKey=`,
          fieldName: "arquivo",
          params: {
            idcontrato: new Id()
          }
        }
        // uploadHandler(responseText){
        //   console.log(responseText)
        // }
      }
    })
  },
  data() {
    return {
      editor: {
        title: "",
        target: "",
        content: ""
      },
      options: {
        tipocontrato: [],
        indice: []
      },
      isSaving: false
    }
  },
  validations: {
    value: {
      descricao: { required },
      pessoa: { required },
      idtipocontrato: { required },
      idindiceatualizacao: {},
      numero: {},

      datainicial: {},
      datafinal: {},
      dataproximarenovacao: {},

      diavencimentoinicial: { between: between(1, 31) },
      diavencimentofinal: { between: between(1, 31) },
      dialimitequestionamento: { between: between(0, 31) },

      multapercentualatraso: {},
      multavaloratraso: {},
      diastoleranciamulta: { minValue: minValue(0) },

      datadistratosemmulta: {},
      tipomultadistrato: {},
      multavalordistrato: {},

      objetocontrato: {}
    }
  },
  ...computed({
    serviceName: "contrato"
  }),
  methods: {
    afterGetData() {
      // execute after service request
      this.autocompleteSelected("pessoa", this.value.pessoa)
    },
    change() {
      // console.log(arguments)
    },
    editorOnChange(content) {
      console.log(content)
      this.editor.content = content
    },
    modalEditorOnClose() {
      this.editor.content = ""
      this.editor.target = ""
    },
    modalEditorOnApply() {
      if (this.editor.target) {
        Vue.set(this.value, this.editor.target, this.editor.content)
        this.$refs.modalEditor.close()
      }
    },
    editValue(title, target) {
      const content = this.value[target] || ""
      this.editor = { title, target, content }

      if (this.value.id) {
        this.$refs.modalEditor.open()
      }
    }
  },
  created() {
    this.options.tipocontrato = []
    this.services.tipoContrato
      .get({
        params: {
          situacao: "A"
        }
      })
      .then(({ data }) => {
        this.options.tipocontrato = data.data
      })
      .catch(error => {
        // TODO add some message
        console.error(error)
      })

    this.services.indice
      .get({
        params: {
          situacao: "A"
        }
      })
      .then(({ data }) => {
        this.options.indice = data.data
      })
      .catch(error => {
        // TODO add some message
        console.error(error)
      })
  },
  watch: {
    // value(value) {},
    "value.idtipocontrato"(value) {
      this.value.tipocontrato = { id: value }
    },
    "value.id"(value) {
      id = value
      // const { name, params, query } = this.$route
      const { query } = this.$route
      // params.id = value || 0
      // console.log({ name, params, query })
      // this.$router.push({ name, params, query })
      this.$router.push({ path: `/contrato/${value || 0}/`, query })
    },
    value(value) {
      const { diretorio } = this.$route.query
      if (diretorio) {
        value.diretorio = { id: diretorio }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

h6
  color $primary
  margin-top 32px

* > img
  max-width 100%
  width 100%
</style>
