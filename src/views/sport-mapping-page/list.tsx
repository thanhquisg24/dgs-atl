// material-ui
import { diRepositorires } from "@adapters/di";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useDataProvider } from "@hooks/useDataProvider";
import { Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

// project imports
import tableIcons from "@ui-component/marterial-table/tableIcons";
import MaterialTable from "material-table";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { Link } from "react-router-dom";

// ==============================|| SAMPLE PAGE ||============================== //

const columns: any = [
  { title: "ID#", field: "id", hidden: true },
  { title: "Donbest Sport ID#", field: "dbSportId" },
  { title: "Donbest Sport Name", field: "dbSportName" },
  { title: "DGS Sport ID#", field: "dgsSportId" },
  { title: "DGS Sport Name", field: "dgsSportName" },
];
const ListSportMappingPage = () => {
  const confirm = useConfirm();
  const tableRef = React.createRef<any>();
  const dataProvider = useDataProvider();
  const getData = (query: any): any =>
    new Promise((resolve) => {
      dataProvider
        .getList("sport-mapping", {
          pagination: {
            page: query.page ? query.page + 1 : 1,
            perPage: query.pageSize,
          },
          sort: { field: "id", order: "DESC" },
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

  const onDelete = (evt: any, data: any) => {
    const deleteFunc = () => {
      emitStartLoading();
      const items: number[] = data.reduce((store: number[], item: any) => {
        // eslint-disable-next-line no-param-reassign
        store = [...store, item.id];
        return store;
      }, []);
      diRepositorires.sportMapping
        .postDeleteItems(items)
        .then(() => {
          notifyMessageSuccess("Delete items successfull!");
          if (tableRef.current) {
            tableRef.current.onQueryChange();
          }
        })
        .catch((error: any) => notifyMessageError(error.message))
        .finally(() => emitStopLoading());
    };
    confirm({ description: "Delete your selection?" })
      .then(() => deleteFunc())
      .catch(() => console.log("Deletion cancelled."));
  };
  return (
    <MaterialTable
      title={
        <Typography variant="h2" color="primary">
          Sport Mapping
        </Typography>
      }
      tableRef={tableRef}
      icons={tableIcons}
      columns={[
        ...columns,
        {
          title: "Action",
          render: (rowData: any) => {
            return (
              <Link to={`/sport-page-edit/${rowData.id}`}>
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
        showTitle: true,
        search: false,
        selection: true,
        pageSize: 20,
      }}
      actions={[
        {
          tooltip: "Delete",
          icon: tableIcons.Delete,
          onClick: onDelete,
        },
      ]}
    />
  );
};

export default ListSportMappingPage;
