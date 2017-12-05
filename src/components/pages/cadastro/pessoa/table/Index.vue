<script>
import AbstractTable from "@/abstract/crud/table"
import CrudFilter from "./Filter"
import { computed } from "@/abstract/util/mixins"

export default {
  extends: AbstractTable,
  components: {
    CrudFilter
  },
  ...computed({
    serviceName: "pessoa",
    config: {
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
            title: "Tipo",
            callback(value) {
              return ["Fornecedor", "Cliente", "Usuário"]["FCU".indexOf(value)]
            }
          },
          {
            name: "situacao",
            sortField: "situacao",
            title: "Situação",
            callback(value) {
              return ["Ativo", "Inativo"]["AI".indexOf(value)]
            }
          },
          {
            name: "__slot:row-action-edit"
          }
        ]
      }
    }
  })
}
</script>
