<template>
  <section>
    <form>
      <div class="row sm-gutter">
        <div class="col-xs-12 col-sm-5">
          <!-- Data Referência Inicial -->
          <q-field>
            <q-datetimepicker v-model="value.datareferenciainicial" float-label="Ref. Inicial" type="date" />
          </q-field>
        </div>

        <div class="col-xs-12 col-sm-5">
          <!-- Data Referência Final -->
          <q-field>
            <q-datetimepicker v-model="value.datareferenciafinal" float-label="Ref. Final" type="date" />
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

