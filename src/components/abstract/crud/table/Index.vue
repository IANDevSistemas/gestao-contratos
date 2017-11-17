<script>
import Vuetable from "vuetable-2"
import VuetablePagination from "vuetable-2/src/components/VuetablePagination"
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo"

import axios from "axios"
import assignIn from "lodash/assignIn"

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

    const vuetable = {
      ref: "table",
      props: {
        fields: config.props.fields,
        apiMode: true,
        paginationPath: "",
        css: {
          tableClass: {
            bordered: true,
            // "horizontal-separator": true,
            // "vertical-separator": true,
            // "cell-separator": true,
            striped: true,
            // "striped-even": true,
            // "striped-odd": true,
            highlight: true,
            // "compact": true,
            // "loose": true,
            // "flipped": true,
            responsive: true,
            "q-table": true
          },
          loadingClass: "",
          ascendingIcon: "fa fa-long-arrow-up",
          descendingIcon: "fa fa-long-arrow-down",
          detailRowClass: "",
          handleIcon: "",
          sortableIcon: "fa fa-arrows-v", // since v1.7
          ascendingClass: "", // since v1.7
          descendingClass: "" // since v1.7
        },
        queryParams: {
          sort: "sort",
          page: "page",
          perPage: "size"
        },
        httpFetch(url, options) {
          const { params } = options
          if (!params.sort) {
            delete params.sort
          }

          const args = assignIn({}, { params: vm.filter }, options)
          console.log(args, options)
          return vm.service.get(args)
        }
      },
      on: {
        "vuetable:pagination-data"(data) {
          vm.pagination.max = data ? Math.floor(data.total / vm.pagination.size) : 0
          vm.$refs.paginationInfo.setPaginationData(data)
        },
        "vuetable:row-dblclicked"(dataItem, event) {
          vm.$emit("edit", JSON.parse(JSON.stringify(dataItem)))
        }
      },
      scopedSlots: {
        "row-action-edit"(props) {
          return h("q-btn", {
            props: {
              icon: "edit",
              color: "primary",
              small: true,
              flat: true,
              round: true
            },
            on: {
              click(data) {
                vm.$emit("edit", JSON.parse(JSON.stringify(props.rowData)))
              }
            }
          })
        }
      }
    }

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
