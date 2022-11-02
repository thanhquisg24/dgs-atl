import { useDataProvider } from "@hooks/useDataProvider";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import tableIcons from "@ui-component/marterial-table/tableIcons";
import { formatToUsDateStr } from "@utils/date-format";
import { Operation, parseFilterForRest } from "@utils/filter-parser";
import { periodCodeText } from "@utils/period-code-text";
import { get } from "lodash";
import MaterialTable from "material-table";
import React from "react";

const columns: any = [
  {
    title: "Id#",
    field: "id",
    hidden: true,
  },
  { title: "Sport", field: "dgsIdSport", customFilterObj: { operator: Operation.LIKEEND, fieldRest: "dgsIdSport" } },
  { title: "Rotation", field: "rot", customFilterObj: { operator: Operation.EQUAL, fieldRest: "rot" } },
  { title: "Team", field: "team", customFilterObj: { operator: Operation.LIKEBOTH, fieldRest: "team" } },
  { title: "Line Type", field: "lineType", customFilterObj: { operator: Operation.LIKEBOTH, fieldRest: "lineType" } },
  {
    title: "Period",
    field: "period",
    lookup: periodCodeText,
    render: (rowData: any) => periodCodeText[rowData.period] || rowData.period,
    customFilterObj: { operator: Operation.IN, fieldRest: "period" },
  },
  { title: "Line", field: "newLine", customFilterObj: { operator: Operation.LIKEBOTH, fieldRest: "newLine" } },
  {
    title: "Update On",
    field: "updatedOn",
    render: (rowData: any) => formatToUsDateStr(rowData.updatedOn),
    filtering: false,
    customFilterObj: { operator: Operation.LIKEEND, fieldRest: "dgsIdSport" },
  },
];

export default function HistoryTable() {
  const tableRef = React.createRef<any>();
  const dataProvider = useDataProvider();

  const onResetFilter = React.useCallback(() => {
    if (tableRef.current) {
      // eslint-disable-next-line array-callback-return
      tableRef.current.dataManager.columns.map((item: any) => {
        tableRef.current.onFilterChange(item.tableData.id, "");
      });
    }
  }, [tableRef]);

  const onRefresh = React.useCallback(() => {
    if (tableRef.current) {
      tableRef.current.onQueryChange();
    }
  }, [tableRef]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      onRefresh();
    }, 15000);
    return () => clearInterval(timer);
  }, [onRefresh]);

  const getData = React.useCallback(
    (query: any): any =>
      new Promise((resolve) => {
        let sortField = get(query, ["orderBy", "field"]);
        let direction = get(query, ["orderDirection"]);
        sortField = sortField || "id";
        direction = direction || "DESC";
        const filterRest = parseFilterForRest(query.filters);
        dataProvider
          .getList("alm-history", {
            pagination: {
              page: query.page ? query.page + 1 : 1,
              perPage: query.pageSize,
            },
            sort: { field: sortField, order: direction.toUpperCase() },
            filter: filterRest,
          })
          .then((result) => {
            resolve({
              data: result.data,
              page: query.page,
              totalCount: result.total,
            });
          });
      }),
    [dataProvider],
  );
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable
        title={
          <Typography variant="h2" color="primary">
            Update History
          </Typography>
        }
        tableRef={tableRef}
        icons={tableIcons}
        columns={[...columns]}
        data={getData}
        options={{
          debounceInterval: 600,
          filtering: true,
          showTitle: true,
          search: false,
          selection: false,
          pageSize: 20,
        }}
        actions={[
          {
            icon: () => (
              <Button variant="outlined" color="primary" startIcon={<ClearIcon />}>
                Clear Filter
              </Button>
            ),
            tooltip: "clear all filters",
            isFreeAction: true,
            onClick: () => {
              onResetFilter(); // set new key causing remount
            },
          },
          {
            icon: () => (
              <Button variant="outlined" color="primary" startIcon={<RefreshIcon />}>
                Refresh
              </Button>
            ),
            tooltip: "Refresh History",
            isFreeAction: true,
            onClick: () => {
              onRefresh(); // set new key causing remount
            },
          },
        ]}
      />
    </Paper>
  );
}
