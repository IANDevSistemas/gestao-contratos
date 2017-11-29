<script>
import { Dialog } from "quasar"
import CrudFormActions from "./Actions"
import Vue from "vue"

import { computed } from "@/abstract/util/mixins"
import services from "service/all"

const dialogBlock = {
  nobuttons: true,
  progress: {
    indeterminate: true
  },
  noBackdropDismiss: true,
  noEscDismiss: true
}

export default {
  components: {
    CrudFormActions
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
      if (!this.validate()) {
        Dialog.create({ title: "Dados inválidos", message: "Verifique os dados inseridos e tente novamente." })
        return
      }

      // Etapa 1: Bloqueia a tela e efetua a ação
      const dialog = Dialog.create({ title: "Salvando...", message: "Aguarde enquanto os dados são salvos.", ...dialogBlock })

      this.save()
        .then(response => {
          // Etapa 3: Mostra a mensagem de sucesso e volta para a tabela
          dialog.close()
          Dialog.create({ title: "Sucesso !", message: "Os dados foram salvos com sucesso." })
        })
        .catch(error => {
          dialog.close()
          Dialog.create({ title: "Erro !", message: "Erro ao salvar os dados." })
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
      const confirm = {
        label: "Sim",
        handler: () => {
          dialog1.close()

          // Etapa 2: Bloqueia a tela e efetua a ação
          const dialog2 = Dialog.create({ title: "Removendo...", message: "Aguarde enquanto os dados são removidos.", ...dialogBlock })

          this.delete()
            .then(response => {
              // Etapa 3: Mostra a mensagem de sucesso e volta para a tabela
              dialog2.close()
              // Dialog.create({ title: "Sucesso!", message: "Os dados foram removidos com sucesso" })
              this.$router.go(-1)
            })
            .catch(error => {
              dialog2.close()
              Dialog.create({ title: "Erro!", message: "Erro ao remover os dados." })
              console.error(error)
            })
        }
      }

      // Etapa 1: Confirmação a ação
      const dialog1 = Dialog.create({ title: "Remover os dados ?", message: "Tem certeza que os dados devem ser removidos ?", buttons: ["Não", confirm] })
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
          // todo: add some message
          console.error(error)
        })
    }
  }
}
</script>
