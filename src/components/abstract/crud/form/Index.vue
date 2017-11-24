<script>
import CrudFormActions from "./Actions"
import Vue from "vue"
import services from "service/all"

export default {
  components: {
    CrudFormActions
  },
  props: {
    serviceName: {
      required: true
    },
    value: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      autocomplete: {}
    }
  },
  computed: {
    services() {
      return services
    },
    service() {
      return services[this.serviceName]
    }
  },
  methods: {
    autocompleteSelected(name, value) {
      Vue.set(this.value, name, value)
      Vue.set(this.autocomplete, name, value.label)
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
      const { value } = this
      if (value.id) {
        promisse = this.service.put({ id: value.id, model: JSON.stringify(value) })
      } else {
        promisse = this.service.post({ id: value.id, model: JSON.stringify(value) })
      }

      promisse
        .then(({ data }) => {
          if (data.error) {
            reject(new Error(data))
            return
          }
          Vue.set(value, "id", data.msg)
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
