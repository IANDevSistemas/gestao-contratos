const table = {
  props: {
    apiMode: true,
    paginationPath: "",
    css: {
      tableClass: {
        "bordered": true,
        // "horizontal-separator": true,
        // "vertical-separator": true,
        // "cell-separator": true,
        "striped": true,
        // "striped-even": true,
        // "striped-odd": true,
        "highlight": true,
        // "compact": true,
        // "loose": true,
        // "flipped": true,
        "responsive": true,
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
    }
  }
}

export default { table }
