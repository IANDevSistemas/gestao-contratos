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
    }
  }
}
</script>
