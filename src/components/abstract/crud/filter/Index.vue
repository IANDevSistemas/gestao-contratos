<script>
import CrudFilterActions from "./Actions"

export default {
  components: { CrudFilterActions },
  props: {
    value: {
      default() {
        return {}
      }
    }
  }
}
</script>
