// material-ui
import { Box, Typography, Grid, Button } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { Controller, useForm } from "react-hook-form";
// project imports
import MainCard from "@ui-component/cards/MainCard";
import BasicTable from "./preview-table";
import React from "react";

import { find } from "lodash";
import { diRepositorires } from "@adapters/di";
import { notifyMessageError, emitStopLoading, emitStartLoading, notifyMessageSuccess } from "../../emiter/AppEmitter";
import { useRouteFunc } from "../../routes/useRouteFunc";
import { useGetList } from "@hooks/useGetList";
import AsynCustomSelectV2 from "@ui-component/AsynCustomSelectV2";

// ==============================|| SAMPLE PAGE ||============================== //
const Title = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item md={4}>
      <Typography variant="h3" gutterBottom align="center" component="span">
        DonBest
      </Typography>
    </Grid>
    <Grid item md={4}>
      <Typography variant="h3" gutterBottom align="center" component="span">
        DGS
      </Typography>
    </Grid>
  </Grid>
);

export interface IRowSportMapping {
  id: null;
  dbSportId: number;
  dbSportName: string;
  dgsSportId: string;
  dgsSportName: string;
}
export interface IState {
  rows: IRowSportMapping[];
}
function checkAddItemMap(row: IRowSportMapping, list: IRowSportMapping[]) {
  const isExist = find(list, (item: IRowSportMapping) => {
    return row.dbSportId === item.dbSportId && row.dgsSportId === item.dgsSportId;
  });
  if (isExist) {
    return false;
  }
  return true;
}

const defaultValues = {
  id: null,
  dbSportId: 0,
  dbSportName: "",
  dgsSportId: "",
  dgsSportName: "",
};
const AddSportMapping = () => {
  const listDataDGS = useGetList(
    JSON.stringify({
      resource: "dgs-sports",
      perPage: 50,
      sort: { field: "sportOrder", order: "ASC" },
    }),
  );
  const listDataDB = useGetList(
    JSON.stringify({
      resource: "db-sport",
      perPage: 50,
      sort: { field: "name", order: "ASC" },
    }),
  );
  const { gotoPage } = useRouteFunc();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [state, setState] = React.useState<IState>({
    rows: [],
  });

  const onSubmit = (data: IRowSportMapping) => {
    let row = data;
    if (checkAddItemMap(row, state.rows)) {
      const db = find(listDataDB.data, (item: any) => {
        return row.dbSportId === item.idSport;
      });
      const dgs = find(listDataDGS.data, (item: any) => {
        return row.dgsSportId === item.idSport;
      });
      if (db) {
        row = { ...row, dbSportName: db.name };
      }
      if (dgs) {
        row = { ...row, dgsSportName: dgs.sportName };
      }
      setState({ rows: [...state.rows, row] });
    }
    // const row: IRowSportMapping = {
    //   id: null,
    //   dbSportId: 0,
    //   dbSportName: "",
    //   dgsSportId: "",
    //   dgsSportName: "",
    // };
    // if (checkAddItemMap(row, state.rows)) {
    //   setState({ rows: [...state.rows, row] });
    // }
  };
  const onDeleteRow = (index: number) => {
    const rows = [...state.rows];
    rows.splice(index, 1);
    setState({ rows });
  };

  function onSave(): void {
    emitStartLoading();
    diRepositorires.sportMapping
      .postAddSportMappings(state.rows)
      .then(() => {
        notifyMessageSuccess("Save successfull!");
        gotoPage("/sport-page-list");
      })
      .catch((error) => {
        const { message } = error.response.data;
        notifyMessageError(message || error.message);
        emitStopLoading();
      })
      .finally(() => emitStopLoading());
  }

  return (
    <MainCard title="Add sport mapping">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "100%" }}>
          <Title></Title>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={4}>
              <Controller
                name="dbSportId"
                control={control}
                rules={{
                  required: "This Field is Required",
                }}
                render={({ field }) => (
                  <AsynCustomSelectV2
                    id="db-sport-select"
                    label="DonBest Sport"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dbSportId?.message}
                    idField="idSport"
                    textField="name"
                    displayIdAndText
                    listData={listDataDB.data}
                  ></AsynCustomSelectV2>
                )}
              />
            </Grid>

            <Grid item md={4}>
              <Controller
                name="dgsSportId"
                control={control}
                rules={{
                  required: "This Field is Required",
                }}
                render={({ field }) => (
                  <AsynCustomSelectV2
                    id="dgs-sport-select"
                    label="DGS Sport"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dgsSportId?.message}
                    idField="idSport"
                    textField="sportName"
                    listData={listDataDGS.data}
                    displayIdAndText
                  ></AsynCustomSelectV2>
                )}
              />
            </Grid>
            <Grid item md={4}>
              <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} type="submit">
                Add item
              </Button>
            </Grid>
          </Grid>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={8}>
              <Typography variant="h3" gutterBottom align="center" component="span">
                Preview mapping table
              </Typography>
              <BasicTable rows={state.rows} onDeleteRow={onDeleteRow} />
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 3.5 }}>
            <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} onClick={() => onSave()}>
              Save
            </Button>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default AddSportMapping;
