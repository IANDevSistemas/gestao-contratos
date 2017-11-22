<script>
import CrudFormActions from "./Actions"
export default {
  props: {
    service: {
      required: true
    },
    value: {
      default() {
        return {}
      }
    }
  },
  components: {
    CrudFormActions
  },
  methods: {
    autocompleteSelected(name, value) {
      this.value[name] = value
    },
    validate() {
      this.$v.value.$touch()
      return !this.$v.value.$error
    },
    save() {
      return new Promise((resolve, reject) => {
        try {
          this.doSave(resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    },
    doSave(resolve, reject) {
      let promisse

      if (this.value.id) {
        promisse = this.service.put({ id: this.value.id, model: JSON.stringify(this.value) })
      } else {
        promisse = this.service.put({ id: this.value.id, model: JSON.stringify(this.value) })
      }

      promisse
        .then(({ data }) => {
          if (data.error) {
            reject(new Error(data))
            return
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
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
    doDelete(resolve, reject) {
      return this.service
        .delete({
          params: {
            id: this.value.id
          }
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    },
    clear() {
      this.$emit("input", {})
    }
  }
}
</script>
