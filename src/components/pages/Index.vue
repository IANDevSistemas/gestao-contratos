<template>
  <section>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$router.push({ path: "/diretorio/0", query: this.$route.query })
  }
}
</script>
