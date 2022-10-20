import { diRepositorires } from "@adapters/di";
import { FilterTypeEnum, IDgsGameEntityWithLeague, IDgsLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Button, Grid, Typography } from "@mui/material";
import { selectEventFilterdReFresh } from "@store/actions";
import { gridSpacing } from "@store/constant";
import { getFeedLoading, getListSportBook, getSelectedGame } from "@store/selector";
import { find } from "lodash";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GameOddsRow } from "./game-odds-row";
import GameSportbookSelect from "./game-sportbook-select";

interface IProps {
  eventLineTypes: IDgsLineTypeEntity[];
  eventFilterPeriodConfig: IFilterPeriodEntity[];
  gameWithLeague: IDgsGameEntityWithLeague;
  defaultSelectedLineType: string | null;
}

type IGameFromValue = IFilterPeriodEntity;
const defaultValues: IGameFromValue = {
  dgsLeagueId: -1,
  type: FilterTypeEnum.EVENT,
  lineTypeId: 0,
  id: null,
  dgsGameId: 0,
  period: -1,
  enabled: true,
  ps: true,
  ml: true,
  total: true,
  dbSportBookId: 0,
  ps_point: 0,
  ps_juice: 0,
  ml_point: 0,
  ml_juice: 0,
  total_point: 0,
  total_juice: 0,
  dbGameId: 0,
  dbLeagueId: 0,
};

function GameFromBody(props: IProps) {
  const { eventFilterPeriodConfig, gameWithLeague, defaultSelectedLineType, eventLineTypes } = props;
  const dispatch = useAppDispatch();
  const listSportBook = useAppSelector(getListSportBook);
  const hookForm = useForm({
    defaultValues,
  });
  const watchLineTypeId = hookForm.watch("lineTypeId");

  React.useEffect(() => {
    if (eventFilterPeriodConfig.length > 0) {
      const defaultFilter = defaultSelectedLineType
        ? find(eventFilterPeriodConfig, { lineTypeId: Number(defaultSelectedLineType) })
        : null;
      if (defaultFilter !== null && defaultFilter !== undefined) {
        hookForm.reset({ ...defaultFilter });
      } else {
        hookForm.reset({ ...eventFilterPeriodConfig[0] });
      }
    } else {
      console.log(
        "🚀 ~ file: game-form.tsx ~ line 55 ~ React.useEffect ~ defaultSelectedLineType",
        defaultSelectedLineType,
      );
      hookForm.reset({ ...defaultValues, lineTypeId: defaultSelectedLineType ? Number(defaultSelectedLineType) : 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventFilterPeriodConfig, defaultSelectedLineType]);

  React.useEffect(() => {
    if (watchLineTypeId !== null) {
      const result = find(eventFilterPeriodConfig, { lineTypeId: watchLineTypeId });
      if (result) {
        hookForm.reset({ ...result, lineTypeId: watchLineTypeId });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchLineTypeId]);

  const onSubmit = (data: IGameFromValue) => {
    console.log("🚀 ~ file: game-form.tsx ~ line 53 ~ onSubmit ~ data", data);
    const { dbLeagueId, dgsLeagueId, idGame, gameProviderIdGame: dbGameId } = gameWithLeague;
    const payload = { ...data, dbLeagueId, dgsLeagueId, dbGameId, dgsGameId: idGame };
    emitStartLoading();
    diRepositorires.donbestFilter
      .postSaveEventFilter(payload)
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
              <GameSportbookSelect listLineType={eventLineTypes} eventFilterPeriodConfig={eventFilterPeriodConfig} />
              <GameOddsRow listSportBook={listSportBook} />
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
  const { gameWithLeague, eventFilterPeriodConfig, defaultSelectedLineType, eventLineTypes } = gameSelected;
  return gameWithLeague !== null ? (
    <GameFormWithLoading
      gameWithLeague={gameWithLeague}
      eventFilterPeriodConfig={eventFilterPeriodConfig}
      defaultSelectedLineType={defaultSelectedLineType}
      eventLineTypes={eventLineTypes}
    />
  ) : (
    <b>Please Select game!</b>
  );
}
