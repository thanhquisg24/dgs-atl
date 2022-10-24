import { diRepositorires } from "@adapters/di";
import { IFilterDeleteItemPayload } from "@adapters/dto";
import { FilterTypeEnum, IDgsGameEntityWithLeague, IDgsLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Button, Grid, Typography } from "@mui/material";
import { selectEventFilterdReFresh } from "@store/actions";
import { gridSpacing } from "@store/constant";
import { useConfirm } from "material-ui-confirm";
import { IMapFilterPeriodConfig } from "@store/models/feed-model";
import {
  getDefaultFilterPeriodSettingByEvent,
  getFeedLoading,
  getListSportBook,
  getSelectedGame,
} from "@store/selector";
import { checkExistsItemIntree } from "@utils/index";
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

export type IGameFromValue = {
  periodConfig: IFilterPeriodEntity[];
  dbSportsBookId: number;
  lineTypeId: number;
};
const defaultValues: IGameFromValue = {
  periodConfig: [],
  lineTypeId: 0,
  dbSportsBookId: 0,
};

const buildEventPeriodPayload = (data: IGameFromValue, gameWithLeague: IDgsGameEntityWithLeague) => {
  const { dbLeagueId, dgsLeagueId, idGame, gameProviderIdGame, dbSportId } = gameWithLeague;
  // const payload = { ...data, dbLeagueId, dgsLeagueId, dbGameId, dgsGameId: idGame };
  const arrImmutableVersion = data.periodConfig.map((e) => ({
    ...e,
    dbSportId,
    dbLeagueId,
    dgsLeagueId,
    dbGameId: gameProviderIdGame,
    dgsGameId: idGame,
    type: FilterTypeEnum.EVENT,
    lineTypeId: data.lineTypeId,
  }));
  const payload = arrImmutableVersion;
  return payload;
};
function GameFromBody(props: IProps) {
  const { mapFilterPeriodConfig, gameWithLeague, defaultSelectedLineType, eventLineTypes } = props;
  const dispatch = useAppDispatch();
  const listSportBook = useAppSelector(getListSportBook);
  const defaultFilterPeriodSetting = useAppSelector(getDefaultFilterPeriodSettingByEvent);
  const confirm = useConfirm();
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
  const isExistsItem = React.useMemo(() => {
    return checkExistsItemIntree(mapFilterPeriodConfig, watchLineTypeId);
  }, [mapFilterPeriodConfig, watchLineTypeId]);

  const onSubmit = (data: IGameFromValue) => {
    const payload = buildEventPeriodPayload(data, gameWithLeague);
    emitStartLoading();
    diRepositorires.donbestFilter
      .postSaveEventFilters(payload)
      .then(() => {
        emitStopLoading();
        dispatch(
          selectEventFilterdReFresh({
            gameWithLeague,
            defaultSelectedLineType: data.lineTypeId,
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
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        const data: IGameFromValue = hookForm.getValues();
        const payload = buildEventPeriodPayload(data, gameWithLeague);
        emitStartLoading();
        diRepositorires.donbestFilter
          .postSaveEventFilters(payload)
          .then(() => {
            diRepositorires.donbestFilter
              .postSyncOdds(gameWithLeague.idGame)
              .then(() => {
                emitStopLoading();
                notifyMessageSuccess("Sync Odds success!");
              })
              .catch(() => {
                notifyMessageError("Sync Odds failure! please try again.");
                emitStopLoading();
              }); //end sync
          })
          .catch(() => {
            notifyMessageError("Sync Odds failure! please try again.");
            emitStopLoading();
          }); //end save
      }
    }); //end trgger
  };
  const onDelete = (): void => {
    const data: IGameFromValue = hookForm.getValues();
    const deleteFunc = () => {
      emitStartLoading();
      const { dgsLeagueId, idGame } = gameWithLeague;
      const payload: IFilterDeleteItemPayload = {
        dgsIdLeague: dgsLeagueId,
        type: FilterTypeEnum.EVENT,
        dgsGameId: idGame,
        lineTypeId: data.lineTypeId,
      };
      diRepositorires.donbestFilter
        .postDeleteFilterItem(payload)
        .then(() => {
          emitStopLoading();
          dispatch(
            selectEventFilterdReFresh({
              gameWithLeague,
              defaultSelectedLineType: 0,
            }),
          );
          notifyMessageSuccess("Deleted success!");
        })
        .catch(() => {
          notifyMessageError("Deleted failure! please try again.");
          emitStopLoading();
        });
    };
    if (data.lineTypeId > 0) {
      confirm({ description: "Delete your selection?" })
        .then(() => deleteFunc())
        .catch(() => console.log("Deletion cancelled."));
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
              <GameSportbookSelect
                listLineType={eventLineTypes}
                listSportBook={listSportBook}
                mapFilterPeriodConfig={mapFilterPeriodConfig}
              />
              <GameOddsRows listSportBook={listSportBook} />
              <Typography variant="h6" color="secondary" sx={{ mt: 3.5 }}>
                This event uses the league setting
              </Typography>
              {/* <Grid item md={12} sx={{ mt: 3.5, mb: 3.5 }}>
          </Grid> */}
            </Grid>
            <Grid item md={3}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="baseline"
                sx={{ maxWidth: "200px" }}
              >
                <Button type="submit" variant="contained" sx={{ flex: 1, mt: 1 }} fullWidth color="success">
                  {isExistsItem ? "Update" : "Save"}
                </Button>
                <Button variant="contained" sx={{ flex: 1, mt: 2 }} onClick={() => onSyncOdds()} fullWidth>
                  Sync Odds
                </Button>
                {isExistsItem && (
                  <Button
                    variant="contained"
                    sx={{ flex: 1, mt: 2 }}
                    fullWidth
                    color="error"
                    onClick={() => onDelete()}
                  >
                    Delete
                  </Button>
                )}
              </Grid>
            </Grid>
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
