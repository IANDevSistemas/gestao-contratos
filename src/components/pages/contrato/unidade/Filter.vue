<template>
  <section>
    <form>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-10">
          <!-- Unidade -->
          <q-field>
            <q-input v-model="value.empresaunidade" float-label="Unidade" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-2">
          <crud-filter-actions @filter="filter" @clear="clear" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import AbstractFilter from "@/abstract/crud/filter"
export default {
  extends: AbstractFilter
}
</script>

