<script>
import CrudFilterActions from "./Actions"
import { LocalStorage } from "quasar"

const STORAGE_KEY = `${location.hash}/filter`

export default {
  components: { CrudFilterActions },
  props: {
    value: {
      default() {
        return {}
      }
    }
  },
  methods: {
    filter() {
      LocalStorage.set(STORAGE_KEY, this.value)
      this.$emit("input", JSON.parse(JSON.stringify(this.value)))
    },
    clear() {
      LocalStorage.set(STORAGE_KEY, {})
      this.$emit("input", {})
    }
  },
  mounted() {
    const value = LocalStorage.get.item(STORAGE_KEY) || {}
    this.$emit("input", value)
  }
}
</script>
