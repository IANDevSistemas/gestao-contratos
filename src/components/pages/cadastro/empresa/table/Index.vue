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
    serviceName: "empresa",
    config: {
      props: {
        fields: [
          {
            name: "idempresa",
            sortField: "idempresa",
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
            name: "apelidoempresa",
            sortField: "apelidoempresa",
            title: "Apelido"
          },
          {
            name: "cnpjcpf",
            sortField: "cnpjcpf",
            title: "CNPJ / CPF"
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
