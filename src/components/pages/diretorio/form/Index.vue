<template>
  <section>
    <q-card>
      <q-card-main>
        <crud-form-actions :title="value.id  ? 'Alterando #' + value.id : 'Incluindo'" @back="$router.go(-1)" @copy="() => { value.id = null }" @clear="value = {}" @save="onSave()" @delete="onDelete()" />

        <!-- Descrição -->
        <q-field :error="$v.value.descricao.$error" error-label="Entre com uma descrição válida" :count="255">
          <q-input v-model.trim="value.descricao" float-label="Descrição" @blur="$v.value.descricao.$touch"></q-input>
        </q-field>

        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-4">
            <!-- Cor -->
            <label>Cor</label>
            <q-field :error="$v.value.cor.$error" error-label="Selecione um valor" dark>
              <q-select v-model="value.cor" :color="value.cor" :options="cores" @blur="$v.value.cor.$touch" inverted/>
            </q-field>
          </div>

          <div class="col-xs-12 col-sm-6">
            <!-- Favorito -->
            <q-field :error="$v.value.favorito.$error" error-label="Selecione um valor">
              <q-checkbox v-model="favorito" label="Favorito" checked-icon="star" unchecked-icon="star_border" @blur="$v.value.favorito.$touch" />
            </q-field>
          </div>
        </div>
      </q-card-main>
    </q-card>
  </section>
</template>

<script>
import AbsctractCrudForm from "@/abstract/crud/form"
import { computed } from "@/abstract/util/mixins"
import { required } from "vuelidate/lib/validators"

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
  extends: AbsctractCrudForm,
  data() {
    return {
      favorito: false,
      isSaving: false
    }
  },
  validations: {
    value: {
      descricao: { required },
      favorito: {},
      cor: {}
    }
  },
  ...computed({
    serviceName: "diretorio",
    cores: cores.map(e => ({ icon: "folder", leftColor: e, value: e, label: e }))
  }),
  watch: {
    favorito(value) {
      this.value.favorito = value ? "S" : "N"
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

section
  margin 20px auto
  margin auto
  max-width 700px
</style>

