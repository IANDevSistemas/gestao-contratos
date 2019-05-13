<template>
  <section>
    <q-card>
      <q-card-main>
        <crud-form-actions
          @back="$router.go(-1)"
          @copy="value.id = null"
          @clear="value = {}"
          @save="onSave()"
          @delete="onDelete()"
        />

        <h6>{{value.pessoa && value.pessoa.text}}</h6>

        <!-- Função -->
        <q-field
          :error="$v.value.funcao.$error"
          error-label="Entre com uma função válida"
          :count="255"
        >
          <q-input
            v-model.trim="value.funcao"
            float-label="Função"
            @blur="$v.value.funcao.$touch"
          ></q-input>
        </q-field>

        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-4">
            <!-- Tipo Responsavel Contrato -->
            <q-field
              :error="$v.value.idtiporesponsavelcontrato.$error"
              error-label="Entre com um valor válido"
            >
              <q-select
                v-model="value.idtiporesponsavelcontrato"
                filter
                float-label="Tipo Responsável"
                filter-placeholder="Filtro..."
                :options="options.tipoResponsavelContrato"
              />
            </q-field>
          </div>
        </div>
      </q-card-main>
    </q-card>
    <crud-form-modal ref="modal" />
  </section>
</template>

<script>
import AbstractForm from "@/abstract/crud/form"
import Vue from "vue"
import { computed } from "@/abstract/util/mixins"
import { required } from "vuelidate/lib/validators"
import services from "service/all"

export default {
  extends: AbstractForm,
  ...computed({
    serviceName: "contratoResponsavel"
  }),
  validations: {
    value: {
      funcao: { required },
      idtiporesponsavelcontrato: { required }
    }
  },
  created() {
    Vue.set(this.options, "tipoResponsavelContrato", [])
    services.tipoResponsavelContrato.get().then(({ data }) => {
      this.options.tipoResponsavelContrato = data.data
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

section
  margin auto
  max-width 800px

h6
  color $primary
  margin-top 32px
</style>
