// material-ui
import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { Controller, useForm } from "react-hook-form";
// project imports
import MainCard from "@ui-component/cards/MainCard";
import React from "react";

import { useDataProvider } from "@hooks/useDataProvider";
import AsynCustomSelectV3 from "@ui-component/AsynCustomSelectV3";
import CustomAutoCompleteV2 from "@ui-component/CustomAutoCompleteV2";
import { useParams } from "react-router-dom";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "../../emiter/AppEmitter";
import { useRouteFunc } from "../../routes/useRouteFunc";
import { diRepositorires } from "@adapters/di";
import { find } from "lodash";
import { GameStatListData } from "./game-stat-selectbox";
import FeedLeagueSelectbox from "./feed-league-selectbox";
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

export interface IState {
  donbestItem: any;
}

interface IFromValue {
  idLeagueForOdds: number | string;
  autoGameCreation: boolean;
  defaultGameStat: string;
  defaultIdGameType: number | string;
  dbSportId: number | null | string;
  dbLeagueId: number | null;
  dgsSportId: string | null;
  dgsLeagueId: number | null | string | any;
  autoScore: boolean;
  enabled: boolean;
}
interface IRowLeagueMapping extends IFromValue {
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
  autoScore: false,
  enabled: false,
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
  // const watchDgsLeague = watch("dgsLeagueId", "");
  const [state, setState] = React.useState<IState>({
    donbestItem: null,
  });

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
      dgsLeagueName: data.dgsLeagueId.label,
      idLeagueForOdds: data.idLeagueForOdds.id,
      autoGameCreation: data.autoGameCreation,
      defaultGameStat: data.defaultGameStat,
      defaultIdGameType: data.defaultIdGameType.id,
      enabled: data.enabled,
      defaultIdGameTypeName: data.defaultIdGameType.label,
      idLeagueForOddsName: data.idLeagueForOdds.label,
      defaultGameStatName: gs ? gs.text : "",
      autoScore: data.autoScore,
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
                League:
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
                    label="DonBest Feed League"
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
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                    }
                    label="Auto Game Creation"
                  />
                )}
              />
              <Controller
                name="autoScore"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                    }
                    label="Auto score"
                  />
                )}
              />
              <Controller
                name="enabled"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                    }
                    label="Active"
                  />
                )}
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
