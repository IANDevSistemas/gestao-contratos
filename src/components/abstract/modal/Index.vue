<template>
  <q-modal ref="modal" :content-css="{ width: '420px', minHeight: '300px' }" :no-backdrop-dismiss="mode === 'block'" :no-esc-dismiss="mode === 'block'">
    <q-modal-layout>
      <q-toolbar>
        <div class="q-toolbar-title">
          {{title}}
        </div>
      </q-toolbar>
      <div class="layout-padding">
        {{message}}
        <q-spinner v-show="isLoading" />
      </div>
      <q-toolbar inverted v-show="mode === 'confirm'">
        <div class="q-toolbar-title"></div>
        <q-btn color="negative" @click="onCancel()">Não</q-btn>
        <q-btn color="positive" @click="onOk()">Sim</q-btn>
      </q-toolbar>

      <q-toolbar inverted v-show="mode === 'dialog'">
        <div class="q-toolbar-title"></div>
        <q-btn color="primary" @click="close()">Ok</q-btn>
      </q-toolbar>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      mode: "dialog",
      title: "",
      message: "",
      cancel() {
        throw new Error("Callback not setted")
      },
      ok() {
        throw new Error("Callback not setted")
      }
    }
  },
  methods: {
    open() {
      this.$refs.modal.open()
      return this
    },
    close() {
      this.$refs.modal.close()
      return this
    },
    block(title, message, isLoading = false) {
      this.close()
      this.mode = "block"
      this.message = message
      this.title = title
      this.isLoading = isLoading
      this.open()
      return this
    },
    dialog(title, message, isLoading = false) {
      this.close()
      this.mode = "dialog"
      this.message = message
      this.title = title
      this.isLoading = isLoading
      this.open()
      return new Promise((resolve, reject) => {
        this.ok = resolve
        this.cancel = reject
      })
    },
    confirm(title, message, isLoading = false) {
      this.close()
      this.mode = "confirm"
      this.message = message
      this.title = title
      this.isLoading = isLoading
      this.open()

      return new Promise((resolve, reject) => {
        this.ok = resolve
        this.cancel = reject
      })
    },
    onOk() {
      try {
        this.ok()
        this.close()
      } catch (error) {
        console.error(error)
      }
    },
    onCancel() {
      try {
        this.cancel()
        this.close()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-padding
  height 200px
  padding 12px

.q-btn
  width 100px
</style>
