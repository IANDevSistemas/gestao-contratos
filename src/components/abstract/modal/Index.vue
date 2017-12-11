<template>
  <q-modal ref="modal" v-model="isOpened" :content-css="{ width: '420px', minHeight: '300px' }" :no-backdrop-dismiss="mode === 'block'" :no-esc-dismiss="mode === 'block'">
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
      isOpened: false,
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
      this.canChange = true
      this.isOpened = true
      return this
    },
    close() {
      this.canChange = true
      this.isOpened = false
      return this
    },
    block(title, message, isLoading = false) {
      this.mode = "block"
      this.message = message
      this.title = title
      this.isLoading = isLoading
      this.ok = () => {}
      this.cancel = () => {}
      return this
    },
    dialog(title, message, isLoading = false) {
      this.mode = "dialog"
      this.message = message
      this.title = title
      this.isLoading = isLoading
      return new Promise((resolve, reject) => {
        this.ok = resolve
        this.cancel = reject
      })
    },
    confirm(title, message, isLoading = false) {
      this.mode = "confirm"
      this.message = message
      this.title = title
      this.isLoading = isLoading

      return new Promise((resolve, reject) => {
        this.ok = resolve
        this.cancel = reject
      })
    },
    onOk() {
      try {
        this.ok()
      } catch (error) {
        console.error(error)
      }
    },
    onCancel() {
      try {
        this.cancel()
      } catch (error) {
        console.error(error)
      }
    }
  }
  // watch: {
  //   isOpened(newValue, oldValue) {
  //     console.log(newValue, oldValue)
  //     // if (this.canChange) {
  //     //   this.canChange = false
  //     // } else {
  //     //   this.canChange = true
  //     //   this.isOpened = oldValue
  //     // }
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.layout-padding
  height 200px
  padding 12px

.q-btn
  width 100px
</style>
