<script>
import Crud from "@/abstract/crud"
import CrudFilter from "./Filter"
import CrudForm from "./Form"
import CrudTable from "./Table"

import { computed } from "@/abstract/util/mixins"

export default {
  extends: Crud,
  components: {
    CrudFilter,
    CrudForm,
    CrudTable
  },
  ...computed({
    title: "Motivo de Contrato",
    serviceName: "motivoContrato"
  })
}
</script>

<style lang="stylus" scoped>
.q-card
  min-height 680px

.q-card
  margin auto
  max-width 900px
</style>
