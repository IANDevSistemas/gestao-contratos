<template>
  <q-card>
    <q-card-main>
      <router-view/>
    </q-card-main>
  </q-card>
</template>

<script>
import service from "service/contrato"

export default {
  data() {
    return {
      contrato: {}
    }
  },
  created() {
    const { id } = this.$route.params
    // this.$router.push({ path: "form", params: { id: idcontrato, idcontrato } })

    if (id && Boolean(Number(id))) {
      service
        .get({ params: { id } })
        .then(({ data }) => {
          this.contrato = data || {}
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-card
  margin auto
  max-width 800px
</style>
