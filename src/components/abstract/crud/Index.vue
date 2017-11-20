<template>
  <q-card>
    <q-card-title>
      {{title}}
    </q-card-title>
    <q-card-main>
      <crud-tab :is-showing="tab === 'table'">
        <crud-filter ref="filter" v-model="filter" />
        <q-card-actions>
          <div class="col-12">
            <div class="row justify-end">
              <q-btn @click="onAdd()" round color="primary" icon="add">
                <q-tooltip>Incluir</q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-card-actions>
        <crud-table ref="table" class="crud-table" v-model="model" :filter="filter" :service="service" @edit="onTableEdit" />
      </crud-tab>
      <crud-tab :is-showing="tab === 'form'">
        <q-card-title>{{model.id ? 'Editando' : 'Incluindo'}}</q-card-title>
        <q-card-separator />
        <crud-form ref="form" v-model="model" :service="service" @save="onFormSave" @back="onFormBack" @delete="onFormDelete" />
      </crud-tab>
    </q-card-main>
  </q-card>
</template>
<script>
import CrudTab from "./tab"
import { Dialog } from "quasar"
import sha1 from "sha1"

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
  data() {
    return {
      model: {},
      filter: {},
      tab: "table"
    }
  },
  methods: {
    onFormSave() {
      const { form } = this.$refs

      if (!form.validate()) {
        Dialog.create({ title: "Dados inválidos", message: "Verifique os dados inseridos e tente novamente." })
        return
      }

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
          Dialog.create({ title: "Erro !", message: "Erro ao salvar os dados." })
          console.error(error)
        })
    },
    onFormDelete() {
      const { form } = this.$refs

      const confirm = {
        label: "Sim",
        handler: () => {
          dialog1.close()

          // Etapa 2: Bloqueia a tela e efetua a ação
          const dialog2 = Dialog.create({ title: "Removendo...", message: "Aguarde enquanto os dados são removidos.", ...dialogBlock })

          form
            .delete()
            .then(response => {
              // Etapa 3: Mostra a mensagem de sucesso e volta para a tabela
              console.log("back")
              dialog2.close()
              // Dialog.create({ title: "Sucesso!", message: "Os dados foram removidos com sucesso" })
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

      // if (self.model._hash === sha1(JSON.stringify(self.model))) {
      // Não houve alteração
      self.model = {}
      self.tab = "table"
      //   return
      // }

      // Dialog.create({
      //   title: "Voltar a tela anterior ?",
      //   message: "Deseja descartar as alterações e voltar a tela anterior ?",
      //   buttons: [
      //     "Não",
      //     {
      //       label: "Sim",
      //       handler() {
      //         self.model = {}
      //         self.tab = "table"
      //       }
      //     }
      //   ]
      // })
    },
    onAdd() {
      const model = {}
      this.model = model
      this.model._hash = sha1(JSON.stringify(model))
      this.tab = "form"
    },
    onTableEdit(model) {
      this.tab = "form"
      this.model = model
      this.model._hash = sha1(JSON.stringify(model))
    }
  },
  watch: {
    tab(value) {
      if (value === "table") {
        this.$refs.table.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.crud-table
  margin-top 24px
</style>

