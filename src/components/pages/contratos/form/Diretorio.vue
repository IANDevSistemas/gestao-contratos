<template>
  <section>
    <q-card>
      <q-card-main>
        <q-toolbar inverted>
          <q-toolbar-title>
            {{model.iddiretorio ? model.descricao : "Novo Diretório"}}
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
            <!-- Cor -->
            <q-field :error="$v.model.cor.$error" error-label="Selecione um valor">
              <q-select v-model="model.cor" float-label="Cor" :options="cores" @blur="$v.model.cor.$touch" />
            </q-field>
          </div>

          <div class="col-xs-12 col-sm-3">
            <!-- Número -->
            <q-field :error="$v.model.numero.$error" error-label="Entre com um número válido" :count="255">
              <q-input v-model.trim="model.numero" float-label="N°" @blur="$v.model.numero.$touch"></q-input>
            </q-field>
          </div>
        </div>
      </q-card-main>
    </q-card>
  </section>
</template>

<script>
import { Toast } from "quasar"
import Vue from "vue"
import VueHtml5Editor from "vue-html5-editor"
import { between, email, minValue, required } from "vuelidate/lib/validators"

const cores = [
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey"
]

export default {
  props: {
    model: {
      default() {
        return {}
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
  computed: {
    cores() {
      return cores.map(e => {
        return { leftColor: e }
      })
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

section
  margin 20px auto
  margin auto
  max-width 700px
</style>

