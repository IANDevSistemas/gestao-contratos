<script>
import CrudFormActions from "./Actions"
export default {
  props: ["value"],
  components: {
    CrudFormActions
  },
  methods: {
    save() {
      return new Promise((resolve, reject) => {
        try {
          this.doSave(resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    },
    delete() {
      return new Promise((resolve, reject) => {
        try {
          this.doDelete(resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    },
    clear() {
      this.$emit("input", {})
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
