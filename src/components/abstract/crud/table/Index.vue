<script>
import Vuetable from "vuetable-2"
import VuetablePagination from "vuetable-2/src/components/VuetablePagination"
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo"

import axios from "axios"
import * as defaults from "./defaults"

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  props: {
    service: {
      required: true
    },
    config: {
      default() {
        return {}
      }
    },
    filter: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      pagination: {
        value: 1,
        max: 12,
        size: 10
      }
    }
  },
  watch: {
    "pagination.value"(value) {
      this.$refs.table.changePage(value)
    }
  },
  render(h) {
    const vm = this

    const table = h("vuetable", {
      ref: "table",
      props: {
        // ...vm.table,
        fields: [
          {
            name: "name",
            sortField: "name"
          },
          "email",
          "birthdate"
        ],
        httpFetch(apiUrl, httpOptions) {
          return vm.service.get(httpOptions)
        },
        ...defaults.table.props
      },
      on: {
        "vuetable:pagination-data"(data) {
          console.log(data)
          // vm.pagination = data
          // pagination.page = data
          // paginationInfo.setPaginationData(data)
        }
      }
    })

    const pagination = h("q-pagination", {
      ref: "pagination",
      props: { ...vm.pagination },
      on: {
        change(value) {
          // console.log(vm, table)
          vm.pagination.value = value
        }
      }
    })

    const paginationInfo = h("vuetable-pagination-info", {
      ref: "paginationInfo"
    })

    // const progress = h("q-progress", {
    //   props: {
    //     color: "positive",
    //     indeterminate: true
    //   }
    // })

    const cols = [paginationInfo, pagination]
    const row = h("div", { class: "row q-data-table-toolbar bottom-toolbar reverse-wrap items-center justify-end" }, cols)

    return h("section", {}, [table, row])
  }
}
</script>

<style lang="stylus">
table
  width 100%
</style>
