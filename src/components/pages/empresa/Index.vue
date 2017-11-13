<script>
import Crud from "@/abstract/crud"
import CrudForm from "./Form"
import CrudTable from "./Table"

export default {
  extends: Crud,
  components: {
    CrudForm,
    CrudTable
  },
  // data() {
  //   return {}
  // },
  computed: {
    title() {
      return "Cadastro Empresa"
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
