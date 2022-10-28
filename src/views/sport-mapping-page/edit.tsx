// material-ui
import { Box, Button, Grid, Typography } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { Controller, useForm } from "react-hook-form";
// project imports
import MainCard from "@ui-component/cards/MainCard";
import React from "react";

import { diRepositorires } from "@adapters/di";
import { useDataProvider } from "@hooks/useDataProvider";
import { useGetList } from "@hooks/useGetList";
import AsynCustomSelectV2 from "@ui-component/AsynCustomSelectV2";
import { useParams } from "react-router-dom";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "../../emiter/AppEmitter";
import { IRowSportMapping } from "./add";
import { find } from "lodash";

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

const defaultValues = {
  id: null,
  dbSportId: 0,
  dbSportName: "",
  dgsSportId: "",
  dgsSportName: "",
};
const EditSportMapping = () => {
  const { id } = useParams<{ id: string }>();
  const dataProvider = useDataProvider();
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
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  React.useEffect(() => {
    if (id) {
      dataProvider.getOne("sport-mapping", { id }).then((result: any) => {
        reset({ ...result });
      });
    }
  }, [dataProvider, id, reset]);

  const onSubmit = (data: IRowSportMapping) => {
    let row = data;
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
    emitStartLoading();
    diRepositorires.sportMapping
      .postUpdateSportMapping(row)
      .then(() => {
        notifyMessageSuccess("Save successfull!");
      })
      .catch((error) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
  };

  return (
    <MainCard title="Edit sport mapping">
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
          </Grid>

          <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" sx={{ mt: 3.5 }}>
            <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} type="submit">
              Save
            </Button>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default EditSportMapping;
