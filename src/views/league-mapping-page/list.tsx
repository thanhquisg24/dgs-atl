// project imports
import { diRepositorires } from "@adapters/di";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useDataProvider } from "@hooks/useDataProvider";
import Edit from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Typography } from "@mui/material";
import tableIcons from "@ui-component/marterial-table/tableIcons";
import { getFilterForRest } from "@utils/index";
import { get } from "lodash";
import MaterialTable from "material-table";
import React from "react";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

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

  const onActive = (evt: any, data: any) => {
    emitStartLoading();
    const items: number[] = data.reduce((store: number[], item: any) => {
      // eslint-disable-next-line no-param-reassign
      store = [...store, item.idLeague];
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
  };
  const onDisabled = (evt: any, data: any) => {
    emitStartLoading();
    const items: number[] = data.reduce((store: number[], item: any) => {
      // eslint-disable-next-line no-param-reassign
      store = [...store, item.idLeague];
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
  };

  const onResetFilter = () => {
    if (tableRef.current) {
      // eslint-disable-next-line array-callback-return
      tableRef.current.dataManager.columns.map((item: any) => {
        tableRef.current.onFilterChange(item.tableData.id, "");
      });
    }
  };
  const getData = (query: any): any =>
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
    });

  // function reFesshTable(): void {
  //   const { current } = tableRef;
  //   if (current) {
  //     current.onQueryChange();
  //   }
  // }

  // const printValue = debounce((value: string) => setState({ textSearch: value }), 1000);
  // Event listener called on every change
  // const onChange = ({ target }: any) => setState({ textSearch: target.value });

  return (
    <Box sx={{ width: "100%" }}>
      <MaterialTable
        title={
          <Typography variant="h2" color="primary">
            League Mapping
          </Typography>
        }
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
            onClick: onActive,
          },
          {
            tooltip: "Disabled",
            icon: tableIcons.DoDisturb,
            onClick: onDisabled,
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
