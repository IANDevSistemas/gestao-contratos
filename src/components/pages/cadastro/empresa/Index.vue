<script>
import Crud from "@/abstract/crud"
import CrudFilter from "./Filter"
import CrudForm from "./Form"
import CrudTable from "./Table"

import { computed } from "@/abstract/util/mixins"
import service from "service/empresa"

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

<style lang="stylus">
.q-card-main
  min-height 680px

.q-card
  margin auto
  max-width 900px
</style>
