<script>
import AbstractCrud from "@/abstract/crud"

import { computed } from "@/abstract/util/mixins"

export default {
  extends: AbstractCrud,
  ...computed({
    title: "Cadastro de Tipo de Responsável"
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
