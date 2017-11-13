import { Dialog } from "quasar"

// [
//   { title: "Remover os dados ?", message: "Tem certeza que os dados devem ser removidos ?" },
//   { title: "Sucesso!", message: "Os dados foram removidos com sucesso" }
//   { title: "Erro!", message: "Erro ao remover os dados" }
// ]

// [
//   { title: "Remover os dados ?", message: "Tem certeza que os dados devem ser removidos ?" },
//   { title: "Sucesso!", message: "Os dados foram removidos com sucesso" }
//   { title: "Erro!", message: "Erro ao remover os dados" }
// ]



export default (promisse, messages = []) => {
  return new Promise((resolve, reject) => {
    try {
      // Etapa 1: Confirmação a ação
      const dialog1 = Dialog.create({
        title: "Confirma a realização da ação ?",
        ...messages[0],
        buttons: [
          "Não",
          {
            label: "Sim",
            handler() {
              dialog1.close()

              // Etapa 2: Bloqueia a tela e efetua a ação
              const dialog2 = Dialog.create({
                title: "Processando...",
                ...messages[1],
                nobuttons: true,
                progress: {
                  indeterminate: true
                },
                noBackdropDismiss: true,
                noEscDismiss: true
              })

              promisse()
                .then((response) => {
                  // Etapa 3: Mostra a mensagem de sucesso e volta para o grid
                  dialog2.close()
                  Dialog.create({
                    title: "Sucesso!",
                    message: "",
                    ...messages[2]
                  })
                  this.tab = "grid"
                })
                .catch((error) => {
                  dialog2.close()
                  Dialog.create({
                    title: "Erro!",
                    message: "",
                    ...messages[3]
                  })
                  console.error(error)
                })
                .catch(reject)
            }
          }
        ]
      })
    } catch (error) {
      reject(error)
    }
  })
