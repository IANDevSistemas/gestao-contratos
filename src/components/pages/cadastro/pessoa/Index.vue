<script>
import Crud from "@/abstract/crud"
import CrudFilter from "./Filter"
import CrudForm from "./Form"
import CrudTable from "./Table"

import { computed } from "@/abstract/util/mixins"
import service from "service/pessoa"

export default {
  extends: Crud,
  components: {
    CrudFilter,
    CrudForm,
    CrudTable
  },
  ...computed({
    title: "Cadastro Pessoas",
    service
  })
}
</script>

<style lang="stylus" scoped>
.q-card
  min-height 800px

.q-card
  margin auto
  max-width 1000px
</style>
