<script>
import Crud from "@/abstract/crud"
import CrudFilter from "./Filter"
import CrudForm from "./Form"
import CrudTable from "./Table"

import { computed } from "@/abstract/util/mixins"
import service from "service/empresa"

console.log(computed({ teste: 12 }))

export default {
  extends: Crud,
  components: {
    CrudFilter,
    CrudForm,
    CrudTable
  },
  ...computed({
    title: "Cadastro Empresa",
    service
  })
}
</script>

<style lang="stylus" scoped>
</style>
