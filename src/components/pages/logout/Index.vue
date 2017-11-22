<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <p>Logout...</p>

  </div>
</template>

<script>
import { mapActions } from "vuex"
import service from "service"

export default {
  methods: {
    ...mapActions(["logout"])
  },
  created() {
    const self = this

    service
      .post("", {
        action: "logout"
      })
      .then(response => {
        self.logout()
        self.$router.push({ path: "/" })
      })
  }
}
</script>


<style lang="stylus" scoped>
</style>
