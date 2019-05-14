<template>
  <q-card-actions>
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
      <q-toolbar-title>{{title}}</q-toolbar-title>
    </div>
    <div class="col">
      <div class="row justify-end">
        <div class="col-2 justify-end">
          <q-btn @click="$emit('save')" round color="positive" icon="save">
            <q-tooltip>Salvar</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </q-card-actions>
</template>


<script>
export default {
  props: ["title"]
}
</script>