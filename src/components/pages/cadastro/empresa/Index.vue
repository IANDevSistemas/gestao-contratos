<script>
import Crud from "@/abstract/crud"
// import CrudFilter from "./Filter"
// import CrudForm from "./form"
// import CrudTable from "./table"

import { computed } from "@/abstract/util/mixins"

export default {
  extends: Crud,
  components: {
    // CrudFilter,
    // CrudForm,
    // CrudTable
  },
  ...computed({
    title: "Cadastro de Empresa",
    serviceName: "empresa"
  })
}
</script>

<style lang="stylus" scoped>
.q-card
  min-height 800px

.q-card
  margin auto
  max-width 900px
</style>
