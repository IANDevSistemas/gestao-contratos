<template>
  <q-card>
    <q-card-title>
      {{title}}
    </q-card-title>
    <q-card-actions>
      <q-btn @click="() => tab = 'form'">Form</q-btn>
      <q-btn @click="() => tab = 'table'">Table</q-btn>
    </q-card-actions>
    <q-card-main>
      <crud-tab :is-showing="tab === 'table'">
        <crud-filter v-model="filter" />
        <crud-table v-model="model" :service="service" />
      </crud-tab>
      <crud-tab :is-showing="tab === 'form'">
        <q-card-actions>
          <q-btn icon="save">Salvar</q-btn>
        </q-card-actions>
        <crud-form v-model="model" />
      </crud-tab>
    </q-card-main>
  </q-card>
</template>
<script>
import CrudTab from "./tab"

const dialogBlock = {
  nobuttons: true,
  progress: {
    indeterminate: true
  },
  noBackdropDismiss: true,
  noEscDismiss: true
}

export default {
  components: { CrudTab },
  props: ["id"],
  data() {
    return {
      modelHash: null,
      model: {},
      filter: {},
      tab: "form"
    }
  },
  methods: {
    onFormSave() {
      // Etapa 1: Bloqueia a tela e efetua a ação
      const dialog = Dialog.create({ title: "Salvando...", message: "Aguarde enquanto os dados são salvos.", ...dialogBlock })

      form
        .save()
        .then(response => {
          // Etapa 3: Mostra a mensagem de sucesso e volta para a tabela
          dialog.close()
          Dialog.create({ title: "Sucesso !", message: "Os dados foram salvos com sucesso." })
          this.tab = "table"
        })
        .catch(error => {
          dialog.close()
          Dialog.create({
            title: "Erro !",
            message: "Erro ao salvar os dados."
          })
          console.error(error)
        })
    },
    onFormRemove() {
      const { form } = this.$refs

      const confirm = {
        label: "Sim",
        handler() {
          dialog1.close()

          // Etapa 2: Bloqueia a tela e efetua a ação
          const dialog2 = Dialog.create({ title: "Removendo...", message: "Aguarde enquanto os dados são removidos.", ...dialogBlock })

          form
            .delete()
            .then(response => {
              // Etapa 3: Mostra a mensagem de sucesso e volta para a tabela
              dialog2.close()
              Dialog.create({ title: "Sucesso!", message: "Os dados foram removidos com sucesso" })
              this.tab = "table"
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
    onFormBack() {
      const self = this

      if (self.modelHash === hash(self.model)) {
        // Não houve alteração
        self.model = {}
        self.tab = "table"
        return
      }

      Dialog.create({
        title: "Voltar a tela anterior ?",
        message: "Deseja descartar as alterações e voltar a tela anterior ?",
        buttons: [
          "Não",
          {
            label: "Sim",
            handler() {
              self.model = {}
              self.tab = "table"
            }
          }
        ]
      })
    },
    onTableAdd() {
      const model = {}
      this.modelHash = hash(model)
      this.model = model
      this.tab = "form"
    },
    onTableEdit(model) {
      this.modelHash = hash(model)
      this.model = model
      this.tab = "form"
    }
  }
}
</script>

