import { diRepositorires } from "@adapters/di";
import { FilterTypeEnum, IDgsGameEntityWithLeague, IDgsLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Button, Grid, Typography } from "@mui/material";
import { selectEventFilterdReFresh } from "@store/actions";
import { gridSpacing } from "@store/constant";
import { IMapFilterPeriodConfig } from "@store/models/feed-model";
import {
  getDefaultFilterPeriodSettingByEvent,
  getFeedLoading,
  getListSportBook,
  getSelectedGame,
} from "@store/selector";
import { get } from "lodash";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GameOddsRows } from "./game-odds-rows";
import GameSportbookSelect from "./game-sportbook-select";

interface IProps {
  eventLineTypes: IDgsLineTypeEntity[];
  mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
  gameWithLeague: IDgsGameEntityWithLeague;
  defaultSelectedLineType: string | null | number;
}

type IGameFromValue = {
  periodConfig: IFilterPeriodEntity[];
  dbSportsBookId: number;
  lineTypeId: number;
};
const defaultValues: IGameFromValue = {
  periodConfig: [],
  lineTypeId: 0,
  dbSportsBookId: 0,
};

function GameFromBody(props: IProps) {
  const { mapFilterPeriodConfig, gameWithLeague, defaultSelectedLineType, eventLineTypes } = props;
  const dispatch = useAppDispatch();
  const listSportBook = useAppSelector(getListSportBook);
  const defaultFilterPeriodSetting = useAppSelector(getDefaultFilterPeriodSettingByEvent);
  const hookForm = useForm({
    defaultValues,
  });

  const watchLineTypeId = hookForm.watch("lineTypeId");
  const watchBookId = hookForm.watch("dbSportsBookId");

  React.useEffect(() => {
    if (defaultSelectedLineType) {
      const itemPeriods = get(mapFilterPeriodConfig, defaultSelectedLineType);
      if (itemPeriods) {
        hookForm.reset({ ...defaultValues, periodConfig: itemPeriods, lineTypeId: Number(defaultSelectedLineType) });
      }
    } else {
      hookForm.reset({ ...defaultValues, periodConfig: defaultFilterPeriodSetting });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapFilterPeriodConfig, defaultSelectedLineType]);

  React.useEffect(() => {
    const itemPeriods = get(mapFilterPeriodConfig, watchLineTypeId);
    if (itemPeriods) {
      hookForm.setValue("periodConfig", itemPeriods);
    } else {
      const periodsVal = hookForm.getValues("periodConfig");
      const arrImmutableVersion = periodsVal.map((e) => ({ ...e, lineTypeId: watchLineTypeId }));
      hookForm.setValue("periodConfig", arrImmutableVersion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchLineTypeId]);
  React.useEffect(() => {
    if (watchBookId === undefined || watchBookId < 1) {
      return;
    }
    const periodsVal = hookForm.getValues("periodConfig");
    const arrImmutableVersion = periodsVal.map((e) => ({
      ...e,
      dbSportBookId: watchBookId,
    }));
    hookForm.setValue("periodConfig", arrImmutableVersion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchBookId]);
  const onSubmit = (data: IGameFromValue) => {
    // console.log("🚀 ~ file: game-form.tsx ~ line 53 ~ onSubmit ~ data", data);
    const { dbLeagueId, dgsLeagueId, idGame, gameProviderIdGame } = gameWithLeague;
    // const payload = { ...data, dbLeagueId, dgsLeagueId, dbGameId, dgsGameId: idGame };
    const arrImmutableVersion = data.periodConfig.map((e) => ({
      ...e,
      dbLeagueId,
      dgsLeagueId,
      dbGameId: gameProviderIdGame,
      dgsGameId: idGame,
      type: FilterTypeEnum.EVENT,
      lineTypeId: data.lineTypeId,
    }));
    const payload = arrImmutableVersion;
    emitStartLoading();
    diRepositorires.donbestFilter
      .postSaveEventFilters(payload)
      .then(() => {
        emitStopLoading();
        dispatch(
          selectEventFilterdReFresh({
            gameWithLeague,
            defaultSelectedLineType,
          }),
        );
        notifyMessageSuccess("Save success!");
      })
      .catch(() => {
        notifyMessageError("Save failure! please try again.");
        emitStopLoading();
      });
  };

  const onSyncOdds = () => {
    if (gameWithLeague.idGame > 0) {
      emitStartLoading();
      diRepositorires.donbestFilter
        .postSyncOdds(gameWithLeague.idGame)
        .then(() => {
          emitStopLoading();
          notifyMessageSuccess("Sync Odds success!");
        })
        .catch(() => {
          notifyMessageError("Sync Odds failure! please try again.");
          emitStopLoading();
        });
    }
  };

  return (
    <fieldset>
      <legend>
        Settings: {gameWithLeague.homeTeam} vs {gameWithLeague.visitorTeam}{" "}
      </legend>
      <FormProvider {...hookForm}>
        <form onSubmit={hookForm.handleSubmit(onSubmit)}>
          <Grid spacing={gridSpacing} container>
            <Grid item md={9}>
              <GameSportbookSelect listLineType={eventLineTypes} listSportBook={listSportBook} />
              <GameOddsRows listSportBook={listSportBook} />
              <Typography variant="h6" color="secondary" sx={{ mt: 3.5 }}>
                This event uses the league setting
              </Typography>
              {/* <Grid item md={12} sx={{ mt: 3.5, mb: 3.5 }}>
          </Grid> */}
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>
          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 3.5 }}>
            <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} onClick={() => onSyncOdds()}>
              Sync Odds
            </Button>

            <Button type="submit" variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
              Save
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </fieldset>
  );
}

function GameFormWithLoading(props: IProps) {
  const isLoading = useAppSelector(getFeedLoading);
  return isLoading ? <b>Loading....!</b> : <GameFromBody {...props} />;
}

export function GameForm() {
  const gameSelected = useAppSelector(getSelectedGame);
  const { gameWithLeague, mapFilterPeriodConfig, defaultSelectedLineType, eventLineTypes } = gameSelected;
  return gameWithLeague !== null ? (
    <GameFormWithLoading
      gameWithLeague={gameWithLeague}
      mapFilterPeriodConfig={mapFilterPeriodConfig}
      defaultSelectedLineType={defaultSelectedLineType}
      eventLineTypes={eventLineTypes}
    />
  ) : (
    <b>Please Select game!</b>
  );
}
