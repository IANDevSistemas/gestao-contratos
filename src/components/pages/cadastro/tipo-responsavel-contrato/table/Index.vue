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
    serviceName: "tipoResponsavelContrato",
    config: {
      props: {
        fields: [
          {
            name: "id",
            sortField: "id",
            title: "Cód."
          },
          {
            name: "descricao",
            sortField: "descricao",
            title: "Descrição"
          },
          {
            name: "aprovador",
            sortField: "aprovador",
            title: "Aprovador",
            callback(value) {
              return ["Sim", "Não"]["SN".indexOf(value)]
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
            name: "__slot:row-action-edit",
            title: ""
          }
        ]
      }
    }
  })
}
</script>
