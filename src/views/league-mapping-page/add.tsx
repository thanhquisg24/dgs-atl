// material-ui
import { Box, Typography, Grid, Button } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { Controller, useForm } from "react-hook-form";
// project imports
import MainCard from "@ui-component/cards/MainCard";
import BasicTable from "./preview-table";
import React from "react";

import CustomAutoCompleteV2 from "@ui-component/CustomAutoCompleteV2";
import AsynCustomSelectV3 from "@ui-component/AsynCustomSelectV3";
import { find } from "lodash";
import { diRepositorires } from "@adapters/di";
import { notifyMessageError, emitStopLoading, emitStartLoading, notifyMessageSuccess } from "../../emiter/AppEmitter";
import { useRouteFunc } from "../../routes/useRouteFunc";

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

export interface IRowLeagueMapping {
  dbSportId: number;
  dbSportName: string;
  dbLeagueId: number;
  dbLeagueName: string;
  dgsSportId: string;
  dgsSportName: string;
  dgsLeagueId: number;
  dgsLeagueName: string;
}
export interface IState {
  rows: IRowLeagueMapping[];
}
function checkAddItemMap(row: IRowLeagueMapping, list: IRowLeagueMapping[]) {
  const isExist = find(list, (item: IRowLeagueMapping) => {
    return row.dbLeagueId === item.dbLeagueId || row.dgsLeagueId === item.dgsLeagueId;
  });
  if (isExist) {
    return false;
  }
  return true;
}

const defaultValues = {
  dbSportId: "",
  dbLeagueId: "",
  dgsSportId: "",
  dgsLeagueId: "",
};
const AddLeagueMapping = () => {
  const { gotoPage } = useRouteFunc();
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const watchDgsSport = watch("dgsSportId", "");
  const watchDbSport = watch("dbSportId", "");
  const [state, setState] = React.useState<IState>({
    rows: [],
  });

  // control.getFieldState;
  const filterDgsSport = React.useMemo(() => {
    if (watchDgsSport === "") {
      return null;
    }
    return { idSport: watchDgsSport };
  }, [watchDgsSport]);

  const filterDbSport = React.useMemo(() => {
    if (watchDbSport === "") {
      return null;
    }
    return { dbSport: { idSport: watchDbSport }, dgsIdLeague: null };
  }, [watchDbSport]);
  React.useEffect(() => {
    setValue("dgsLeagueId", "");
  }, [setValue, watchDgsSport]);

  const onSubmit = (data: any) => {
    console.log("🚀 ~ file: add.tsx ~ line 88 ~ onSubmit ~ data", data);
    // const multipleValues = getValues(["test", "test1"]);
    const row: IRowLeagueMapping = {
      dbSportId: data.dbSportId,
      dbSportName: "",
      dbLeagueId: data.dbLeagueId.id,
      dbLeagueName: data.dbLeagueId.label,
      dgsSportId: data.dgsSportId,
      dgsSportName: "",
      dgsLeagueId: data.dgsLeagueId.id,
      dgsLeagueName: data.dgsLeagueId.label,
    };
    if (checkAddItemMap(row, state.rows)) {
      setState({ rows: [...state.rows, row] });
    }
  };
  const onDeleteRow = (index: number) => {
    const rows = [...state.rows];
    rows.splice(index, 1);
    setState({ rows });
  };

  function onSave(): void {
    emitStartLoading();
    diRepositorires.donbestLeague
      .postSaveLeagueMappings(state.rows)
      .then(() => {
        notifyMessageSuccess("Save successfull!");
        gotoPage("/league-page-list");
      })
      .catch((error) => {
        const { message } = error.response.data;
        notifyMessageError(message || error.message);
        emitStopLoading();
      })
      .finally(() => emitStopLoading());
  }

  return (
    <MainCard title="Add league  mapping">
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
                  <AsynCustomSelectV3
                    id="db-sport-select"
                    label="DonBest Sport"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dbSportId?.message}
                    idField="idSport"
                    textField="name"
                    queryStr={JSON.stringify({
                      resource: "db-sport",
                      perPage: 50,
                      sort: { field: "name", order: "ASC" },
                    })}
                    displayIdAndText
                  ></AsynCustomSelectV3>
                )}
              />
              <Controller
                control={control}
                name="dbLeagueId"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <CustomAutoCompleteV2
                    sx={{ mt: 2 }}
                    id="donbest-league-select"
                    label="DonBest League"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dgsLeagueId?.message}
                    idField="idLeague"
                    textField="name"
                    dependencyField="dbSport.idSport"
                    queryStr={JSON.stringify({
                      resource: "db-league",
                      perPage: 50,
                      filter: filterDbSport,
                      sort: { field: "name", order: "ASC" },
                    })}
                  />
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
                  <AsynCustomSelectV3
                    id="dgs-sport-select"
                    label="DGS Sport"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dgsSportId?.message}
                    idField="idSport"
                    textField="sportName"
                    queryStr={JSON.stringify({
                      resource: "dgs-sports",
                      perPage: 50,
                      sort: { field: "sportOrder", order: "ASC" },
                    })}
                    displayIdAndText
                  ></AsynCustomSelectV3>
                )}
              />

              {/* <CustomAutoComplete /> */}
              <Controller
                control={control}
                name="dgsLeagueId"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <CustomAutoCompleteV2
                    sx={{ mt: 2 }}
                    id="dgs-league-select"
                    label="DGS League"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dgsLeagueId?.message}
                    idField="idLeague"
                    textField="description"
                    dependencyField="idSport"
                    queryStr={JSON.stringify({
                      resource: "dgs-league",
                      perPage: 50,
                      filter: filterDgsSport,
                      sort: { field: "description", order: "ASC" },
                    })}
                  />
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

export default AddLeagueMapping;
