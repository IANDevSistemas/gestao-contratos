<template>
  <div>
    <div class="page">
      <div class="card-container">
        <q-card>
          <form @submit.prevent.stop="submit">
            <q-card-title>
              Login
              <span slot="subtitle">Ir para Gestão de Contratos</span>
            </q-card-title>
            <q-card-main>
              <q-field :error="$v.form.usr.$error" error-label="Usuário inválido">
                <q-input v-model.trim="form.usr" float-label="Usuário" @blur="$v.form.usr.$touch" />
              </q-field>
              <q-field :error="$v.form.pwd.$error" error-label="Senha inválida">
                <q-input v-model.trim="form.pwd" float-label="Senha" @blur="$v.form.pwd.$touch" type="password" />
              </q-field>
              <q-field>
                <q-checkbox v-model="form.save" label="Salvar acesso nesse computador" />
              </q-field>
            </q-card-main>
            <q-card-actions align="end">
              <q-btn loader v-model="isSubmiting" type="submit" color="primary" class="full-width">
                <span>Entrar</span>
              </q-btn>
            </q-card-actions>
          </form>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import { Dialog } from "quasar"
import qs from "qs"
import { required } from "vuelidate/lib/validators"
import service from "service"
import sha1 from "sha1"
import store from "store"

export default {
  store,
  data() {
    return {
      form: {
        save: false
      },
      isSubmiting: false
    }
  },
  computed: {
    ...mapGetters(["auth", "loggedIn"])
  },
  methods: {
    ...mapActions(["login"]),
    submit(redir) {
      return service
        .post("", {
          action: "login",
          usr: this.auth.usr,
          pwd: `!${sha1(this.auth.pwd)}`
        })
        .then(response => {
          if (response.data === "odwctrl?action=menu") {
            this.login(this.auth)
            if (typeof redir === "String") {
              this.$router.push(redir)
              return
            }
            this.$router.push({ path: "/" })
          } else {
            Dialog.create({ title: "Erro !", message: "Verifique os dados de acesso e tente novamente." })
          }
        })
        .catch(error => {
          Dialog.create({ title: "Erro !", message: "Verifique sua conexão e tente novamente." })
          console.error(error)
        })
    }
  },
  validations: {
    form: {
      usr: { required },
      pwd: { required }
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push({ path: "/logout", query: this.$route.query })
      return
    }

    const { usr, pwd, redir } = qs.parse(window.location.search.substr(1))
    const { auth } = this

    auth.save = true
    this.form = auth

    if (usr && pwd) {
      this.form.usr = usr
      this.form.pwd = pwd
      this.submit(redir).then(() => {
        window.location.search = ""
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
.page
  background url('./background.svg') no-repeat center center fixed
  background-size cover
  height 100%
  position absolute
  width 100%

.card-container
  left 50%
  margin-right -50%
  min-width 420px
  position absolute
  top 50%
  transform translate(-50%, -50%)

.q-card
  background-color white
  padding 32px

  > *
    width 100%
</style>
