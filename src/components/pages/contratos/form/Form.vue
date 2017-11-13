<template>
  <div>
    <q-card class="contrato">
      <q-card-main>
        <section>
          <q-toolbar inverted>
            <q-toolbar-title>
              {{model.idcontrato ? `Contrato #${model.idcontrato}` : "Novo Contrato"}}
            </q-toolbar-title>
          </q-toolbar>

          <!-- Descrição -->
          <q-field :error="$v.model.descricao.$error" error-label="Entre com uma descrição válida" :count="255">
            <q-input v-model.trim="model.descricao" float-label="Descrição" @blur="$v.model.descricao.$touch"></q-input>
          </q-field>

          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-6">
              <!-- Pessoa -->
              <q-field :error="$v.model.pessoa.$error" error-label="Selecione um valor">
                <q-select v-model="model.pessoa" float-label="Contratante / Contratado" radio :options="[ { label: 'Google', value: 'goog' }, { label: 'Facebook', value: 'fb' } ]" @blur="$v.model.pessoa.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-3">
              <!-- Tipo Contrato -->
              <q-field :error="$v.model.tipocontrato.$error" error-label="Selecione um valor">
                <q-select v-model="model.tipocontrato" float-label="Tipo Contrato" radio :options="[ { label: 'Google', value: 'goog' }, { label: 'Facebook', value: 'fb' } ]" @blur="$v.model.tipocontrato.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-3">
              <!-- Número -->
              <q-field :error="$v.model.numero.$error" error-label="Entre com um número válido" :count="255">
                <q-input v-model.trim="model.numero" float-label="N°" @blur="$v.model.numero.$touch"></q-input>
              </q-field>
            </div>
          </div>

          <!-- Unidades -->
          <q-field :error="$v.model.unidades.$error" error-label="Selecione as unidades">
            <q-select v-model="model.unidades" multiple chips float-label="Unidades" :options="[ { label: 'Google', value: 'goog' }, { label: 'Facebook', value: 'fb' } ]" @blur="$v.model.unidades.$touch" />
          </q-field>

          <h6>Vigência</h6>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-4">
              <!-- Data Inicial -->
              <q-field :error="$v.model.datainicial.$error" error-label="Inválida">
                <q-datetime v-model="model" type="date" format="DD/MM/YYYY" :max="model.datafinal" v-model.trim="model.datainicial" float-label="Data Inicial" @blur="$v.model.datainicial.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-4">
              <!-- Data Final -->
              <q-field :error="$v.model.datafinal.$error" error-label="Inválida">
                <q-datetime v-model="model" type="date" format="DD/MM/YYYY" :min="model.datainicial" v-model.trim="model.datafinal" float-label="Data Final" @blur="$v.model.datafinal.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-4">
              <!-- Data Próxima Renovação -->
              <q-field :error="$v.model.dataproximarenovacao.$error" error-label="Inválida">
                <q-datetime v-model="model" type="date" format="DD/MM/YYYY" :min="model.datainicial" v-model.trim="model.dataproximarenovacao" float-label="Próxima Renovação" @blur="$v.model.dataproximarenovacao.$touch" />
              </q-field>
            </div>
          </div>

          <h6>Vencimento</h6>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-4">
              <!-- Dia Vencimento Inicial -->
              <q-field :error="$v.model.diavencimentoinicial.$error" error-label="Valor deve estar entre 1 e 31">
                <q-input v-model="model.diavencimentoinicial" align="right" v-money="{ precision: 0 }" float-label="Dia Vencimento Inicial" @blur="$v.model.diavencimentoinicial.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-4">
              <!-- Dia Vencimento Final -->
              <q-field :error="$v.model.diavencimentofinal.$error" error-label="Valor deve estar entre 1 e 31">
                <q-input v-model="model.diavencimentofinal" align="right" v-money="{ precision: 0 }" float-label="Dia Vencimento Final" @blur="$v.model.diavencimentofinal.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-4">
              <!-- Dia Limite Questionamento -->
              <q-field :error="$v.model.dialimitequestionamento.$error" error-label="Valor deve estar entre 0 e 31">
                <q-input v-model="model.dialimitequestionamento" align="right" v-money="{ precision: 0 }" float-label="Dia Limite Questionamento" @blur="$v.model.dialimitequestionamento.$touch" />
              </q-field>
            </div>
          </div>

          <h6>Multa</h6>
          <div class="row sm-gutter">
            <div class="col-xs-12 col-sm-4">
              <!-- Multa Atraso Percentual -->
              <q-field :error="$v.model.multapercentualatraso.$error" error-label="Valor deve ser maior que 0">
                <q-input v-model="model.multapercentualatraso" align="right" v-money="{ precision: 3, suffix: ' %' }" float-label="Multa Atraso Percentual" @blur="$v.model.multapercentualatraso.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-4">
              <!-- Valor Multa Atraso -->
              <q-field :error="$v.model.multavaloratraso.$error" error-label="Valor deve ser maior que R$ 0,00">
                <q-input v-model="model.multavaloratraso" align="right" v-money="{ prefix: 'R$ ' }" float-label="Valor Multa Atraso" @blur="$v.model.multavaloratraso.$touch" />
              </q-field>
            </div>

            <div class="col-xs-12 col-sm-4">
              <!-- Dias Tolerancia Multa -->
              <q-field :error="$v.model.diastoleranciamulta.$error" error-label="Valor deve ser maior que 0">
                <q-input v-model="model.diastoleranciamulta" align="right" v-money="{ precision: 0 }" float-label="Dias Tolerância Multa" @blur="$v.model.diastoleranciamulta.$touch" />
              </q-field>
            </div>
          </div>
        </section>

        <!-- Objeto do contrato -->
        <section>
          <q-toolbar inverted>
            <q-btn flat small @click="editModel('Editar Objeto do Contrato', 'objetocontrato')">
              <q-icon name="mode_edit" />
            </q-btn>
            <q-toolbar-title>
              Objeto do Contrato
            </q-toolbar-title>
          </q-toolbar>
          <div v-html="model.objetocontrato"></div>
        </section>

        <!-- Condições Pagamento -->
        <section>
          <q-toolbar inverted>
            <q-btn flat small @click="editModel('Editar Condições de Pagamento', 'condicoespagamento')">
              <q-icon name="mode_edit" />
            </q-btn>
            <q-toolbar-title>
              Condições de Pagamento
            </q-toolbar-title>
          </q-toolbar>
          <div v-html="model.condicoespagamento"></div>
        </section>

        <!-- Condições Renovação -->
        <section>
          <q-toolbar inverted>
            <q-btn flat small @click="editModel('Editar Condições de Renovação', 'condicoesrenovacao')">
              <q-icon name="mode_edit" />
            </q-btn>
            <q-toolbar-title>
              Condições de Renovação
            </q-toolbar-title>
          </q-toolbar>
          <div v-html="model.condicoesrenovacao"></div>
        </section>
      </q-card-main>
    </q-card>
    <!-- Scroll -->
    <q-fixed-position corner="top-right" :offset="[0, 100]">
      <div v-back-to-top.animate="{ offset: 200, duration: 200 }" round v-ripple class="animate-pop play-backtotop">
        <q-icon name="keyboard_arrow_up" />
        <span>Topo</span>
      </div>
    </q-fixed-position>

    <!-- Save -->
    <q-fixed-position corner="bottom-right" :offset="[16, 16]">
      <q-btn v-model="isSaving" loader @click="submit" round color="primary" icon="save">
        <q-spinner-facebook slot="loading"></q-spinner-facebook>
      </q-btn>
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
  </div>
</template>

<script>
import { Toast } from "quasar"
import Vue from "vue"
import VueHtml5Editor from "vue-html5-editor"
import { between, email, minValue, required } from "vuelidate/lib/validators"

import service from "service/pessoa"

export default {
  components: {
    VueHtml5Editor: new VueHtml5Editor({})
  },
  props: {
    model: {
      default() {
        return {
          unidades: []
        }
      }
    }
  },
  data() {
    return {
      editor: {
        title: "",
        target: "",
        content: ""
      },
      isSaving: false
    }
  },
  validations: {
    model: {
      descricao: { required },
      email: { email, required },
      pessoa: { required },
      tipocontrato: { required },
      numero: {},

      datainicial: {},
      datafinal: {},
      dataproximarenovacao: {},

      unidades: { required },

      diavencimentoinicial: { between: between(1, 31) },
      diavencimentofinal: { between: between(1, 31) },
      dialimitequestionamento: { between: between(0, 31) },

      multapercentualatraso: {},
      multavaloratraso: {},
      diastoleranciamulta: { minValue: minValue(0) },

      objetocontrato: { required }
    }
  },
  methods: {
    editorOnChange(content) {
      this.editor.content = content
    },
    modalEditorOnClose() {
      this.editor.content = ""
      this.editor.target = ""
    },
    modalEditorOnApply() {
      if (this.editor.target) {
        Vue.set(this.model, this.editor.target, this.editor.content)
        this.$refs.modalEditor.close()
        // this.$forceUpdate()
      }
    },
    editModel(title, target) {
      const content = this.model[target] || ""
      this.editor = { title, target, content }
      this.$refs.modalEditor.open()
    },
    submit(event, done) {
      // this.$v.model.$touch()
      if (this.$v.model.$error) {
        done()
        Toast.create("Dados inválidos")
        return
      }

      done()
      Toast.create("Salvo")
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

.contrato
  margin auto
  max-width 700px

  h6
    color $primary
    margin-top 32px

.play-backtotop
  background-color $secondary
  border-radius 10px 0 0 10px
  padding 26px

  &:hover
    color $grey-4
    cursor pointer

section
  margin 20px auto

// Wusiwyg
.vue-html5-editor>.toolbar>ul>li[title='full screen'], .vue-html5-editor>.toolbar>ul>li[title='info']
  display none
</style>
