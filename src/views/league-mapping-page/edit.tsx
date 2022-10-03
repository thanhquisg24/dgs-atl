// material-ui
import { Box, Button, Grid, Typography } from "@mui/material";
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
  donbestItem: any;
}

interface IFromValue {
  dgsSportId: any;
  dgsLeagueId: any;
}
const defaultValues: IFromValue = {
  dgsSportId: "",
  dgsLeagueId: "",
};
const EditLeagueMapping = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const dataProvider = useDataProvider();
  console.log("🚀 ~ file: edit.tsx ~ line 65 ~ EditLeagueMapping ~ leagueId", leagueId);
  const { gotoPage } = useRouteFunc();
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const watchDgsSport = watch("dgsSportId", "");
  const watchDgsLeague = watch("dgsLeagueId", "");
  const [state, setState] = React.useState<IState>({
    donbestItem: null,
  });

  // control.getFieldState;
  const filterDgsSport = React.useMemo(() => {
    if (watchDgsSport === "" && watchDgsLeague === "") {
      return null;
    }
    return { idSport: watchDgsSport, idLeague: watchDgsLeague.id };
  }, [watchDgsSport, watchDgsLeague]);

  // React.useEffect(() => {
  //   setValue("dgsLeagueId", "");
  // }, [setValue, watchDgsSport]);

  React.useEffect(() => {
    if (leagueId) {
      dataProvider.getOne("db-league", { id: leagueId }).then((result: any) => {
        setState({ donbestItem: result });
        reset({ dgsSportId: result.dgsIdSport, dgsLeagueId: { id: result.dgsIdLeague } });
        // setValue("dgsSportId", result.dgsIdSport);
        // setValue("dgsLeagueId", { id: result.dgsIdLeague });
        console.log("🚀 ~ file: edit.tsx ~ line 103 ~ dataProvider.getOne ~ result", result);
      });
    }
  }, [dataProvider, leagueId, reset]);

  const onSubmit = (data: any) => {
    emitStartLoading();
    // const multipleValues = getValues(["test", "test1"]);
    const row: IRowLeagueMapping = {
      dbSportId: state.donbestItem?.dbSport.idSport,
      dbSportName: "",
      dbLeagueId: state.donbestItem.idLeague,
      dbLeagueName: state.donbestItem.name,
      dgsSportId: data.dgsSportId,
      dgsSportName: "",
      dgsLeagueId: data.dgsLeagueId.id,
      dgsLeagueName: data.dgsLeagueId.label,
    };
    diRepositorires.donbestLeague
      .postSaveLeagueMapping(row)
      .then((result) => {
        console.log(
          "🚀 ~ file: add.tsx ~ line 117 ~ diRepositorires.donbestLeague.postSaveLeagueMappings ~ result",
          result,
        );
        notifyMessageSuccess("Save successfull!");
        gotoPage("/league-page-list");
      })
      .catch((error) => notifyMessageError(error.message))
      .finally(() => emitStopLoading());
  };

  // function onSave(): void {
  //   emitStartLoading();
  //   // diRepositorires.donbestLeague
  //   //   .postSaveLeagueMappings(state.rows)
  //   //   .then((result) => {
  //   //     console.log(
  //   //       "🚀 ~ file: add.tsx ~ line 117 ~ diRepositorires.donbestLeague.postSaveLeagueMappings ~ result",
  //   //       result,
  //   //     );
  //   //     notifyMessageSuccess("Save successfull!");
  //   //     gotoPage("/league-page-list");
  //   //   })
  //   //   .catch((error) => notifyMessageError(error.message))
  //   //   .finally(() => emitStopLoading());
  // }

  return (
    <MainCard title="Add league  mapping">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "100%" }}>
          <Title></Title>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={4}>
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
