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
              name: "empresagrupo",
              sortField: "empresagrupo",
              title: "Grupo"
            },
            {
              name: "cnpjcpf",
              sortField: "cnpjcpf",
              title: "CNPJ / CPF"
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
