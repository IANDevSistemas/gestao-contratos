<template>
  <q-card-actions>
    <div class="col">
      <q-btn @click="$router.go(-1)" small flat round color="primary" icon="arrow_back">
        <q-tooltip>Voltar</q-tooltip>
      </q-btn>
    </div>
    <div class="col">
      <div class="row justify-end">
        <div class="col-2 justify-end">
          <q-btn @click="$emit('add')" round color="primary" icon="add">
            <q-tooltip>Novo</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </q-card-actions>
</template>
