<script>
import AbstractTable from "@/abstract/crud/table"

export default {
  extends: AbstractTable,
  computed: {
    config() {
      return {
        props: {
          fields: [
            {
              name: "idpessoa",
              sortField: "idpessoa",
              title: "Cód."
            },
            {
              name: "nomerazaosocial",
              sortField: "nomerazaosocial",
              title: "Razão Social"
            },
            {
              name: "nomefantasia",
              sortField: "nomefantasia",
              title: "Nome Fantasia"
            },
            {
              name: "idpessoaerp",
              sortField: "idpessoaerp",
              title: "Cód. ERP"
            },
            {
              name: "tipopessoa",
              sortField: "tipopessoa",
              title: "Tipo"
            },
            {
              name: "situacao",
              sortField: "situacao",
              title: "Situação",
              callback(value) {
                return value === "A" ? "Ativo" : value === "I" ? "Inativo" : ""
              }
            },
            {
              name: "__slot:row-action-edit",
              title: "",
              titleClass: "center aligned",
              dataClass: "center aligned"
            }
          ]
        }
      }
    }
  }
}
</script>
