// project imports
import { diRepositorires } from "@adapters/di";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useDataProvider } from "@hooks/useDataProvider";
import MaterialTable from "@material-table/core";
import ClearIcon from "@mui/icons-material/Clear";
import Edit from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Typography } from "@mui/material";
import tableIcons from "@ui-component/marterial-table/tableIcons";
import { getFilterForRest } from "@utils/index";
import { get } from "lodash";
import React from "react";
import { Link } from "react-router-dom";

const columns: any = [
  {
    title: "ID",
    field: "id",
    hidden: true,
  },
  { title: "Donbest Sport", field: "dbSport.name", render: (rowData: any) => rowData.dbSport.name },
  { title: "DGS Sport", field: "dgsIdSport" },
  { title: "Donbest League", field: "name" },
  { title: "Feed League", field: "idLeagueForOddsName" },
  { title: "DGS League", field: "dgsLeagueName" },

  { title: "Game Type", field: "defaultIdGameTypeName" },
  { title: "Game Stat", field: "defaultGameStatName" },
  { title: "Auto Game Creation", field: "autoGameCreation", type: "boolean" },
  { title: "Enabled", field: "enabled", type: "boolean" },
];
const ListLeagueMapping = () => {
  const tableRef = React.createRef<any>();
  const dataProvider = useDataProvider();
  // React.useEffect(() => {
  //   // eslint-disable-next-line no-return-assign
  //   return () => (tableRef.current. = null);
  // }, []);
  const onActive = React.useCallback((evt: any, data: any) => {
    emitStartLoading();
    const items: number[] = data.reduce((store: number[], item: any) => {
      // eslint-disable-next-line no-param-reassign
      store = [...store, item.id];
      return store;
    }, []);
    diRepositorires.donbestLeague
      .putActiveItemsLeagueMapping(items)
      .then(() => {
        notifyMessageSuccess("Active items successfull!");
        if (tableRef.current) {
          tableRef.current.onQueryChange();
        }
      })
      .catch((error: any) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onDisabled = React.useCallback((evt: any, data: any) => {
    emitStartLoading();
    const items: number[] = data.reduce((store: number[], item: any) => {
      // eslint-disable-next-line no-param-reassign
      store = [...store, item.id];
      return store;
    }, []);
    diRepositorires.donbestLeague
      .putDisabledItemsLeagueMapping(items)
      .then(() => {
        notifyMessageSuccess("Disabled items successfull!");
        if (tableRef.current) {
          tableRef.current.onQueryChange();
        }
      })
      .catch((error) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onDelete = React.useCallback((evt: any, data: any) => {
    emitStartLoading();
    const items: number[] = data.reduce((store: number[], item: any) => {
      // eslint-disable-next-line no-param-reassign
      store = [...store, item.id];
      return store;
    }, []);
    diRepositorires.donbestLeague
      .deleteItems(items)
      .then(() => {
        notifyMessageSuccess("Delete items successfull!");
        if (tableRef.current) {
          tableRef.current.onQueryChange();
        }
      })
      .catch((error) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResetFilter = React.useCallback(() => {
    if (tableRef.current) {
      // console.log("🚀 ~ file: list.tsx ~ line 80 ~ onResetFilter ~ tableRef.current", tableRef.current);
      // eslint-disable-next-line array-callback-return
      tableRef.current.dataManager.columns.map((item: any) => {
        tableRef.current.onFilterChange(item.tableData.id, "");
      });
      // tableRef.current.clearCriteria();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = React.useCallback(
    (query: any): any =>
      new Promise((resolve) => {
        let sortField = get(query, ["orderBy", "field"]);
        let direction = get(query, ["orderDirection"]);
        sortField = sortField || "dgsIdLeague";
        direction = direction || "DESC";
        const filterRest = getFilterForRest(query.filters);
        dataProvider
          .getList("db-league", {
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
    <Box sx={{ width: "100%" }}>
      <MaterialTable
        title={
          <Typography variant="h2" color="primary">
            League Mapping
          </Typography>
        }
        // localization={{
        //   //@ts-ignore
        //   labelRowsSelect: undefined,
        //   pagination: {
        //     labelDisplayedRows: "{from}-{to} of {count}",
        //   },
        //   toolbar: {
        //     nRowsSelected: "{0} row(s) selected",
        //   },
        //   header: {
        //     actions: "Actions",
        //   },
        //   body: {
        //     emptyDataSourceMessage: "No records to display",
        //     filterRow: {
        //       filterTooltip: "Filter",
        //     },
        //   },
        // }}
        tableRef={tableRef}
        icons={tableIcons}
        columns={[
          ...columns,
          {
            title: "Action",
            filtering: false,
            sorting: false,
            render: (rowData) => {
              return (
                <Link to={`/league-page-edit/${rowData.id}`} className="game__teamName">
                  <IconButton color="inherit">
                    <Edit />
                  </IconButton>
                </Link>
              );
            },
          },
        ]}
        data={getData}
        options={{
          debounceInterval: 600,
          filtering: true,
          showTitle: true,
          search: false,
          selection: true,
          pageSize: 20,
        }}
        actions={[
          {
            tooltip: "Active",
            icon: tableIcons.Check,
            iconProps: { color: "success" },
            onClick: onActive,
          },
          {
            tooltip: "Disabled",
            icon: tableIcons.DoDisturb,
            onClick: onDisabled,
          },
          {
            tooltip: "Delete",
            icon: tableIcons.Delete,
            iconProps: { color: "error" },
            onClick: onDelete,
          },
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
        ]}
      />
      {/* <button type="button" onClick={() => reFesshTable()}>
          ok
        </button> */}
    </Box>
  );
};
export default ListLeagueMapping;
