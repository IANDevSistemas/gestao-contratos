<template>
  <section>
    <q-card>
      <q-card-title>
        Protocolo
      </q-card-title>
      <q-card-main>
        <crud-form-actions :title="value.id  ? 'Alterando #' + value.id : 'Incluindo'" @back="$router.go(-1)" @copy="() => { value.id = null }" @clear="value = {}" @save="onSave()" @delete="onDelete()" />

        <!-- Descritivo -->
        <q-field :error="$v.value.descritivo.$error" error-label="Entre com um valor válido" :count="4096">
          <q-input v-model.trim="value.descritivo" float-label="Descritivo" type="textarea" :min-rows="7" @blur="$v.value.descritivo.$touch"></q-input>
        </q-field>

        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-3">
            <!-- Data Inclusão -->
            <q-field :error="$v.value.datainclusao.$error" error-label="Entre com um valor válido">
              <q-datetimepicker v-model="value.datainclusao" type="date" float-label="Data" @blur="$v.value.datainclusao.$touch" />
            </q-field>
          </div>

          <div class="col-xs-12 col-sm-3">
            <!-- Situação -->
            <q-field :error="$v.value.situacao.$error" error-label="Entre com um valor válido">
              <q-select v-model="value.situacao" float-label="Situação" :options="[ { value: 'P', label: 'Pendente' }, { value: 'R', label: 'Resolvido' } ]" />
            </q-field>
          </div>

          <div class="col-xs-12 col-sm-6">
            <!-- Protocolo -->
            <q-field :error="$v.value.protocolo.$error" error-label="Entre com um valor válido" :count="255">
              <q-input v-model.trim="value.protocolo" float-label="Protocolo" @blur="$v.value.protocolo.$touch"></q-input>
            </q-field>
          </div>
        </div>

        <div class="row sm-gutter">
          <div class="col-xs-12 col-sm-3">
            <!-- Data Lembrete -->
            <q-field :error="$v.value.datalembrete.$error" error-label="Entre com um valor válido">
              <q-datetimepicker v-model="value.datalembrete" type="date" float-label="Data Lembrete" @blur="$v.value.datalembrete.$touch" />
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
import { computed } from "@/abstract/util/mixins"
import { required } from "vuelidate/lib/validators"

export default {
  extends: AbstractForm,
  data() {
    return {
      telefone: [],
      municipio: ""
    }
  },
  ...computed({
    serviceName: "contratoProtocolo"
  }),
  validations: {
    value: {
      descritivo: { required },
      situacao: { required },
      protocolo: { required },
      datainclusao: { required },
      datalembrete: {}
    }
  },
  created() {
    const { contrato } = this.$route.query
    if (contrato) {
      this.value.contrato = { id: contrato }
    }
  }
}
</script>

<style lang="stylus" scoped>
section
  margin auto
  max-width 800px
</style>
