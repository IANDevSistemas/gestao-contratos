<template>
  <div>
    <q-card>
      <vuetable ref="vuetable" :fields="['name', 'email', 'birthdate']" :css="{ tableClass: 'q-table bordered highlight striped-odd responsive' }"></vuetable>
    </q-card>
  </div>
</template>

<script>
import Vuetable from "vuetable-2/src/components/Vuetable"
import VuetablePagination from "vuetable-2/src/components/VuetablePagination"
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo"

import data from "./data.json"

const lastClick = Symbol("lastClick")

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  props: {
    value: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    rowClick(row) {
      const time = new Date().getTime()
      const event = time - 500 < row[lastClick] ? "change" : "input"
      row[lastClick] = time
      this.$emit(event, row)
    }
  }
}
</script>
