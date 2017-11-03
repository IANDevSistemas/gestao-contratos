<template>
  <div>
    <!-- Scroll -->
    <q-fixed-position corner="bottom-right" :offset="[0, 100]">
      Back to top
    </q-fixed-position>

    <form @submit.prevent="submit">
      <span class="caption">Contrato #{{model.idcontrato}}</span>

      <!-- Descrição -->
      <q-field :error="$v.model.descricao.$error" error-label="Entre com uma descrição válida" :count="255">
        <q-input v-model.trim="model.descricao" float-label="Descrição" @blur="$v.model.descricao.$touch"></q-input>
      </q-field>

      <!-- Pessoa -->
      <q-field :error="$v.model.pessoa.$error" error-label="Selecione um valor">
        <q-select v-model="model.pessoa" float-label="Contratante / Contratado" radio :options="[ { label: 'Google', value: 'goog' }, { label: 'Facebook', value: 'fb' } ]" @blur="$v.model.pessoa.$touch" />
      </q-field>

      <!-- Unidades -->
      <q-field :error="$v.model.unidades.$error" error-label="Selecione as unidades">
        <q-select v-model="model.unidades" multiple chips float-label="Unidades" :options="[ { label: 'Google', value: 'goog' }, { label: 'Facebook', value: 'fb' } ]" @blur="$v.model.unidades.$touch" />
      </q-field>

      <section>
        <div>
          <span class="caption">Objeto do contrato</span>
          <q-btn flat color="primary" @click="editObjetocontrato">Editar</q-btn>
        </div>
        <div v-html="model.objetocontrato"></div>
      </section>

      <q-btn color="primary" @click="submit">Submit</q-btn>
    </form>

    <!-- Modal -->
    <q-modal ref="modalEditor" :content-css="{ width: '60vw', height: '500px' }" @close="modalEditorOnClose">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn flat @click="$refs.modal.close()">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            {{editor.title}}
          </q-toolbar-title>
        </q-toolbar>
        <vue-html5-editor :height="350" :z-index="500000000000" :content="editor.content" @change="editorOnChange" :auto-height="false" />
        <q-toolbar slot="footer">
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
    <!-- /Modal -->
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators"
import VueHtml5Editor from "vue-html5-editor"
import { Toast } from "quasar"

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
      }
    }
  },
  validations: {
    model: {
      descricao: { required },
      email: { email, required },
      pessoa: { required },
      objetocontrato: { required },
      unidades: { required }
    }
  },
  methods: {
    editorOnChange(content) {
      this.editor.content = content
    },
    modalEditorOnClose() {
      if (this.editor.target) {
        this.model[this.editor.target] = this.editor.content
        this.editor.target = ""
        this.$forceUpdate()
      }
    },
    editObjetocontrato() {
      this.editor = {
        title: "Editar Objeto do Contrato",
        target: "objetocontrato",
        content: this.model.objetocontrato || ""
      }
      this.$refs.modalEditor.open()
    },
    submit() {
      this.$v.model.$touch()
      if (this.$v.model.$error) {
        Toast.create("Dados inválidos")
        return
      }

      Toast.create("Dados válidos")
    }
  }
}
</script>

<style lang="stylus">
form
  > .q-field, > *
    margin-top 32px

section
  border-top 1px solid black
</style>
