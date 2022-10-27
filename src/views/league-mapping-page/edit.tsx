// material-ui
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { Controller, useForm } from "react-hook-form";
// project imports
import MainCard from "@ui-component/cards/MainCard";
import React from "react";

import { diRepositorires } from "@adapters/di";
import { IDonbestLeagueEntity } from "@adapters/entity";
import { useDataProvider } from "@hooks/useDataProvider";
import AsynCustomSelectV2 from "@ui-component/AsynCustomSelectV2";
import CustomAutoCompleteV2 from "@ui-component/CustomAutoCompleteV2";
import { find } from "lodash";
import { useParams } from "react-router-dom";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "../../emiter/AppEmitter";
import { useRouteFunc } from "../../routes/useRouteFunc";
import DgsSportMappingSelectbox from "./dgs-sport-mapping-selectbox";
import FeedLeagueSelectbox from "./feed-league-selectbox";
import { GameStatListData } from "./game-stat-selectbox";

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

interface IState {
  donbestItem: IDonbestLeagueEntity;
}
const defaultStateItem: IDonbestLeagueEntity = {
  id: 0,
  idLeague: 0,
  dbSport: {
    idSport: 0,
    name: "",
  },
  enabled: false,
  name: "",
  dgsIdLeague: 1,
  dgsIdSport: "",
  idSportsbook: 0,
  idLeagueForOdds: 0,
  dgsLeagueName: "",
  defaultIdGameType: 0,
  defaultGameStat: "",
  autoGameCreation: false,
  defaultGameStatName: "",
  defaultIdGameTypeName: "",
  idLeagueForOddsName: "",
};

interface IFromValue {
  id: number;
  idLeagueForOdds: number | string;
  autoGameCreation: boolean;
  defaultGameStat: string;
  defaultIdGameType: number | string;
  dbSportId: number | null | string;
  dbLeagueId: number | null;
  dgsSportId: string | null;
  dgsLeagueId: number | null | string | any;
  enabled: boolean;
}
interface IRowLeagueMapping extends IFromValue {
  id: number;
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
  autoScore: boolean;
  enabled: boolean;
  autoGameCreation: boolean;
}
const defaultValues: IFromValue = {
  dgsSportId: "",
  dgsLeagueId: "",
  idLeagueForOdds: "",
  autoGameCreation: false,
  defaultGameStat: "",
  defaultIdGameType: "",
  dbSportId: null,
  dbLeagueId: null,
  enabled: false,
  id: 0,
};
const EditLeagueMapping = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const dataProvider = useDataProvider();
  const { gotoPage } = useRouteFunc();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const watchDgsSport = watch("dgsSportId", "");
  const watchDbSport = watch("dbSportId");
  // const watchDgsLeague = watch("dgsLeagueId", "");
  const [state, setState] = React.useState<IState>({ donbestItem: defaultStateItem });

  // control.getFieldState;
  const filterDgsSport = React.useMemo(() => {
    if (watchDgsSport === "") {
      return null;
    }
    return { idSport: watchDgsSport };
  }, [watchDgsSport]);

  // React.useEffect(() => {
  //   setValue("dgsLeagueId", "");
  // }, [setValue, watchDgsSport]);

  React.useEffect(() => {
    if (leagueId) {
      dataProvider.getOne("db-league", { id: leagueId }).then((result: any) => {
        setState({ donbestItem: result });
        reset({
          ...result,
          dbSportId: result.dbSport.idSport,
          dgsSportId: result.dgsIdSport,
          dgsLeagueId: { id: result.dgsIdLeague },
          defaultIdGameType: { id: result.defaultIdGameType },
          idLeagueForOdds: { id: result.idLeagueForOdds },
        });
      });
    }
  }, [dataProvider, leagueId, reset]);

  const onSubmit = (data: any) => {
    emitStartLoading();
    // const multipleValues = getValues(["test", "test1"]);
    const gs = find(GameStatListData, { id: data.defaultGameStat });
    const row: IRowLeagueMapping = {
      dbSportId: state.donbestItem?.dbSport.idSport,
      dbSportName: "",
      dbLeagueId: state.donbestItem.idLeague,
      dbLeagueName: state.donbestItem.name,
      dgsSportId: data.dgsSportId,
      dgsSportName: "",
      dgsLeagueId: data.dgsLeagueId.id,
      dgsLeagueName: data.dgsLeagueId.label ? data.dgsLeagueId.label : state.donbestItem.dgsLeagueName,
      idLeagueForOdds: data.idLeagueForOdds.id,
      autoGameCreation: data.autoGameCreation,
      defaultGameStat: data.defaultGameStat,
      defaultIdGameType: data.defaultIdGameType.id,
      enabled: data.enabled,
      defaultIdGameTypeName: data.defaultIdGameType.label ? data.defaultIdGameType.label : state.donbestItem.defaultGameStatName,
      idLeagueForOddsName: data.idLeagueForOdds.label ? data.idLeagueForOdds.label : state.donbestItem.idLeagueForOddsName,
      defaultGameStatName: gs ? gs.text : "",
      autoScore: data.autoScore,
      id: data.id,
    };
    diRepositorires.donbestLeague
      .postSaveLeagueMapping(row)
      .then(() => {
        notifyMessageSuccess("Save successfull!");
        gotoPage("/league-page-list");
      })
      .catch((error) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
  };

  return (
    <MainCard title="Edit league  mapping">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "100%" }}>
          <Title></Title>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={2}>
              <Typography variant="h5" gutterBottom align="left" component="p">
                Sport:
              </Typography>
              <Typography variant="body1" gutterBottom align="left" component="p" sx={{ ml: 2 }}>
                {state.donbestItem?.dbSport.idSport} - {state.donbestItem?.dbSport.name}
              </Typography>
              <Typography variant="h5" gutterBottom align="left" component="p">
                DonBest Leagues (Schedules):
              </Typography>
              <Typography variant="body1" gutterBottom align="left" component="p" sx={{ ml: 2 }}>
                {state.donbestItem?.idLeague} - {state.donbestItem?.name}
              </Typography>

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
                    initSport={{
                      id: 0,
                      dbSportId: state.donbestItem.dbSport.idSport,
                      dbSportName: state.donbestItem.dbSport.name,
                      dgsSportId: state.donbestItem.dgsIdSport,
                      dgsSportName: state.donbestItem.dgsIdSport,
                    }}
                  ></DgsSportMappingSelectbox>
                )}
              />

              {/* <CustomAutoComplete /> */}
              {filterDgsSport && (
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
                      defaultOption={[
                        {
                          id: state.donbestItem.dgsIdLeague,
                          label: state.donbestItem.dgsLeagueName,
                        },
                      ]}
                      queryStr={JSON.stringify({
                        resource: "dgs-league",
                        perPage: 50,
                        filter: filterDgsSport,
                        sort: { field: "description", order: "ASC" },
                      })}
                    />
                  )}
                />
              )}
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
          </Grid>

          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 3.5 }}>
            <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} type="submit">
              Save
            </Button>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default EditLeagueMapping;
