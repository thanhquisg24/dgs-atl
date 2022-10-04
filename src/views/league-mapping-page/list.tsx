// project imports
import { diRepositorires } from "@adapters/di";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useDataProvider } from "@hooks/useDataProvider";
import { Box, IconButton } from "@mui/material";
import MainCard from "@ui-component/cards/MainCard";
import tableIcons from "@ui-component/marterial-table/tableIcons";
import MaterialTable from "material-table";
import Edit from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import React from "react";

const columns: any = [
  {
    title: "ID",
    field: "idLeague",
  },
  { title: "Name", field: "name" },
  { title: "Donbest Sport", field: "dbSport", render: (rowData: any) => rowData.dbSport.name },
  { title: "DGS Sport", field: "dgsIdSport" },
  { title: "DGS League", field: "dgsIdLeague" },
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

  const getData = (query: any): any =>
    new Promise((resolve, reject) => {
      dataProvider
        .getList("db-league", {
          pagination: {
            page: query.page ? query.page + 1 : 1,
            perPage: query.pageSize,
          },
          sort: { field: "dgsIdLeague", order: "DESC" },
          filter: {},
        })

        .then((result) => {
          resolve({
            data: result.data,
            page: query.page,
            totalCount: result.total,
          });
        });
    });

  return (
    <>
      <MainCard title="List league mapping">asdasd</MainCard>
      <Box sx={{ width: "100%" }}>
        <MaterialTable
          tableRef={tableRef}
          icons={tableIcons}
          columns={[
            ...columns,
            {
              title: "Action",
              render: (rowData) => {
                return (
                  <Link to={`/league-page-edit/${rowData.idLeague}`} className="game__teamName">
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
            showTitle: false,
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
          ]}
        />
      </Box>
    </>
  );
};
export default ListLeagueMapping;
