// material-ui
import { Box, Typography, Grid, Button, FormControlLabel, Checkbox } from "@mui/material";
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
import AsynCustomSelectV2 from "@ui-component/AsynCustomSelectV2";
import { GameStatListData } from "./game-stat-selectbox";
import FeedLeagueSelectbox from "./feed-league-selectbox";
import DgsSportMappingSelectbox from "./dgs-sport-mapping-selectbox";

// ==============================|| SAMPLE PAGE ||============================== //
const Title = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item md={2}>
      <Typography variant="h3" gutterBottom align="center" component="span">
        DonBest
      </Typography>
    </Grid>
    <Grid item md={2}>
      <Typography variant="h3" gutterBottom align="center" component="span">
        DGS
      </Typography>
    </Grid>
  </Grid>
);

interface IFromValues {
  id: null;
  idLeagueForOdds: number | string;
  autoGameCreation: boolean;
  defaultGameStat: string;
  defaultIdGameType: number | string;
  dbSportId: number | null | string;
  dbLeagueId: number | null;
  dgsSportId: string | null;
  dgsLeagueId: number | null;
  enabled: boolean;
}
export interface IRowLeagueMapping extends IFromValues {
  id: null;
  dbSportId: number;
  dbSportName: string;
  dbLeagueId: number;
  dbLeagueName: string;
  dgsSportId: string;
  dgsSportName: string;
  dgsLeagueId: number;
  dgsLeagueName: string;
  defaultIdGameTypeName: string;
  idLeagueForOddsName: string;
  defaultGameStatName: string;
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

const defaultValues: IFromValues = {
  dbSportId: "",
  dbLeagueId: null,
  dgsSportId: "",
  dgsLeagueId: null,
  idLeagueForOdds: "",
  autoGameCreation: false,
  defaultGameStat: "",
  defaultIdGameType: "",
  enabled: false,
  id: null,
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
  const watchDgsSport = watch("dgsSportId");
  const watchDbSport = watch("dbSportId");
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
    if (watchDbSport === null) {
      return null;
    }
    return { dbSport: { idSport: watchDbSport }, dgsIdLeague: null };
  }, [watchDbSport]);
  React.useEffect(() => {
    setValue("dgsLeagueId", null);
  }, [setValue, watchDgsSport]);

  const onSubmit = (data: any) => {
    const gs = find(GameStatListData, { id: data.defaultGameStat });
    const row: IRowLeagueMapping = {
      id: null,
      dbSportId: data.dbSportId,
      dbSportName: "",
      dbLeagueId: data.dbLeagueId.id,
      dbLeagueName: data.dbLeagueId.label,
      dgsSportId: data.dgsSportId,
      dgsSportName: "",
      dgsLeagueId: data.dgsLeagueId.id,
      dgsLeagueName: data.dgsLeagueId.label,
      idLeagueForOdds: data.idLeagueForOdds.id,
      autoGameCreation: data.autoGameCreation,
      defaultGameStat: data.defaultGameStat,
      defaultIdGameType: data.defaultIdGameType.id,
      enabled: data.enabled,
      defaultIdGameTypeName: data.defaultIdGameType.label,
      idLeagueForOddsName: data.idLeagueForOdds.label,
      defaultGameStatName: gs ? gs.text : "",
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
    if (state.rows.length > 0) {
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
  }

  return (
    <MainCard title="Add league mapping">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "100%" }}>
          <Title></Title>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={2}>
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
                    label="DonBest Leagues (Schedules)"
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

              <Controller
                control={control}
                name="idLeagueForOdds"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <FeedLeagueSelectbox
                    sx={{ mt: 2 }}
                    id="feed-league-select"
                    label="DonBest Leagues (Odds)"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.idLeagueForOdds?.message}
                    idField="id"
                    textField="name"
                  />
                )}
              />
            </Grid>

            <Grid item md={2}>
              <Controller
                name="dgsSportId"
                control={control}
                rules={{
                  required: "This Field is Required",
                }}
                render={({ field }) => (
                  <DgsSportMappingSelectbox
                    id="dgs-sport-select"
                    label="DGS Sport"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dgsSportId?.message}
                    displayIdAndText
                    dbSportId={watchDbSport}
                  ></DgsSportMappingSelectbox>
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
            <Grid item md={2}>
              <Controller
                name="defaultGameStat"
                control={control}
                rules={{
                  required: "This Field is Required",
                }}
                render={({ field }) => (
                  <AsynCustomSelectV2
                    id="db-game-stat-select"
                    label="Default Game Stat"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.defaultGameStat?.message}
                    idField="id"
                    textField="text"
                    listData={GameStatListData}
                  ></AsynCustomSelectV2>
                )}
              />
              <Controller
                control={control}
                name="defaultIdGameType"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <CustomAutoCompleteV2
                    sx={{ mt: 2 }}
                    id="id-default-game-type"
                    label="Default Game Type"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.defaultIdGameType?.message}
                    idField="idGameType"
                    textField="description"
                    queryStr={JSON.stringify({
                      resource: "dgs-game-type",
                      perPage: 50,
                      sort: { field: "description", order: "ASC" },
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item md={2}>
              <Controller
                name="autoGameCreation"
                control={control}
                render={({ field }) => <FormControlLabel control={<Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />} label="Auto Game Creation" />}
              />

              <Controller
                name="enabled"
                control={control}
                render={({ field }) => <FormControlLabel control={<Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />} label="Active" />}
              />
            </Grid>
            <Grid item md={12}>
              <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} type="submit">
                Add item
              </Button>
            </Grid>
          </Grid>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={10}>
              <Typography variant="h3" gutterBottom align="center" component="span">
                Preview mapping table
              </Typography>
              <BasicTable rows={state.rows} onDeleteRow={onDeleteRow} />
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" sx={{ mt: 3.5 }}>
            <Button variant="contained" color="success" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} onClick={() => onSave()}>
              Save
            </Button>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default AddLeagueMapping;
