<script>
import CrudFormActions from "./Actions"
import CrudFormModal from "../../modal"
import Vue from "vue"

import services from "service/all"

export default {
  components: {
    CrudFormActions,
    CrudFormModal
  },
  data() {
    return {
      autocomplete: {},
      value: {}
    }
  },
  computed: {
    service() {
      return services[this.serviceName]
    },
    services() {
      return services
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
    onSave() {
      const { modal } = this.$refs
      if (!this.validate()) {
        modal.open().dialog("Dados inválidos", "Verifique os dados inseridos e tente novamente.")
        return
      }

      // Etapa 1: Bloqueia a tela e efetua a ação
      modal.open().block("Salvando...", "Aguarde enquanto os dados são salvos.", true)

      this.save()
        .then(data => {
          // Etapa 3: Mostra a mensagem de sucesso e volta para a tabela
          modal.dialog("Sucesso !", "Os dados foram salvos com sucesso.")
          this.value.id = data.msg
        })
        .catch(error => {
          modal.dialog("Erro !", "Erro ao salvar os dados.")
          console.error(error)
        })
    },
    doSave(resolve, reject) {
      let promisse
      const { value } = this
      if (value.id) {
        promisse = this.service.put({ id: value.id, model: JSON.stringify(value) })
      } else {
        promisse = this.service.post({ model: JSON.stringify(value) })
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
    onDelete() {
      const { modal } = this.$refs

      // Etapa 1: Confirmação a ação
      modal
        .open()
        .confirm("Remover os dados ?", "Tem certeza que os dados devem ser removidos ?")
        .then(() => {
          // Etapa 2: Bloqueia a tela e efetua a ação
          modal.block("Removendo...", "Aguarde enquanto os dados são removidos.", true)

          this.delete()
            .then(response => {
              // Etapa 3: Mostra a mensagem de sucesso e volta para a tabela
              // modal.close()
              this.$router.go(-1)
            })
            .catch(error => {
              modal.dialog("Erro!", "Erro ao remover os dados.")
              console.error(error)
            })
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
    }
  },
  created() {
    const { id } = this.$route.params
    if (id && Boolean(Number(id))) {
      this.service
        .get({ params: { id } })
        .then(({ data }) => {
          this.value = data || {}
        })
        .catch(error => {
          // TODO: add some message
          console.error(error)
        })
    }
  }
}
</script>
