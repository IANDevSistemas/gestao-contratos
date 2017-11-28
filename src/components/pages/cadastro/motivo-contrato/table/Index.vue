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
    serviceName: "motivoContrato",
    config: {
      props: {
        fields: [
          {
            name: "idtipocontrato",
            sortField: "idtipocontrato",
            title: "Cód."
          },
          {
            name: "descricao",
            sortField: "descricao",
            title: "Descrição"
          },
          {
            name: "situacao",
            sortField: "situacao",
            title: "Situação",
            callback(value) {
              switch (value) {
                case "A":
                  return "Ativo"
                case "I":
                  return "Inativo"
                default:
                  return ""
              }
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
  })
}
</script>
