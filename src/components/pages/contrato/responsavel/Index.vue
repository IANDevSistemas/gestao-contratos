<template>
  <section>
    <q-toolbar color="primary" inverted>
      <q-toolbar-title>
        Contrato: {{contrato.descricao}}
        <span slot="subtitle">
          Subtitle
        </span>
      </q-toolbar-title>
    </q-toolbar>

    <q-data-table :data="list" :config="config" :columns="columns" />
  </section>
</template>

<script>
import services from "service/all"

export default {
  data() {
    return {
      contrato: {},
      list: [],
      config: {
        rowHeight: "50px",
        title: "Responsáveis",
        refresh: true,
        bodyStyle: {
          maxHeight: "500px"
        }
      },
      columns: [{ label: "Responsável", field: "pessoa" }, { label: "Tipo", field: "tiporesponsavelcontrato" }, { label: "Função", field: "funcao" }]
    }
  },
  methods: {
    refresh() {
      const { params } = this.$route
      services.contrato
        .get({ params })
        .then(({ data }) => {
          this.contrato = data
        })
        .catch(error => {
          // TODO add message
          console.log(error)
        })

      services.contratoResponsavel
        .get({ params: { idcontrato: params.id } })
        .then(({ data }) => {
          this.list = data.data
        })
        .catch(error => {
          // TODO add message
          console.log(error)
        })
    }
  },
  created() {
    this.refresh()
  }
}
</script>
