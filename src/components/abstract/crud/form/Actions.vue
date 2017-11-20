<template>
  <div class="actions">
    <div class="row">
      <div class="col">
        <q-btn @click="$emit('back')" small flat round color="primary" icon="arrow_back">
          <q-tooltip>Voltar</q-tooltip>
        </q-btn>
        <q-btn @click="$emit('copy')" small flat round color="primary" icon="content_copy">
          <q-tooltip>Copiar</q-tooltip>
        </q-btn>
        <q-btn @click="$emit('clear')" small flat round color="primary" icon="clear">
          <q-tooltip>Limpar</q-tooltip>
        </q-btn>
        <q-btn @click="$emit('delete')" small flat round color="negative" icon="delete_forever">
          <q-tooltip>Deletar</q-tooltip>
        </q-btn>
      </div>
      <div class="col">
        <div class="row justify-end">
          <div class="col-2 justify-end">
            <q-btn @click="$emit('save')" round color="negative" icon="save">
              <q-tooltip>Salvar</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="stylus" scoped>
</style>

