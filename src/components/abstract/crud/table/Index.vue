<script>
import Vuetable from "vuetable-2"
import VuetablePagination from "vuetable-2/src/components/VuetablePagination"
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo"

import axios from "axios"
import defaultsDeep from "lodash/defaultsDeep"
import defaults from "./defaults"

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
    },
    filter(value) {
      this.$refs.table.refresh()
    }
  },
  render(h) {
    const vm = this
    const config = vm.config || {}

    const vuetable = defaultsDeep(
      {
        ref: "table",
        props: {
          httpFetch(url, options) {
            const { params } = options
            if (!params.sort) {
              delete params.sort
            }
            return vm.service.get(defaultsDeep({ params: vm.filter }, options))
          }
        },
        on: {
          "vuetable:pagination-data"(data) {
            vm.pagination.max = data ? Math.floor(data.total / vm.pagination.size) : 0
            vm.$refs.paginationInfo.setPaginationData(data)
          },
          "vuetable:row-dblclicked"(dataItem, event) {
            vm.$emit("edit", dataItem)
          }
        }
      },
      config,
      defaults.table
    )

    const table = h("vuetable", vuetable)

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
