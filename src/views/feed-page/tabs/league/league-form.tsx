import { diRepositorires } from "@adapters/di";
import { IFilterDeleteItemPayload } from "@adapters/dto";
import { FilterTypeEnum, IFilterLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Grid } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { selectLeagueIdRefresh } from "@store/actions";
import { gridSpacing } from "@store/constant";
import {
  getDefaultFilterLineTypeSetting,
  getDefaultFilterPeriodSetting,
  getLeagueLeftInfoTree,
  getListLineType,
  getListSportBook,
  getSelectedLeague,
  getSelectedLeagueId,
} from "@store/selector";
import { RootStateType } from "@store/types";
import { checkExistsItemIntree } from "@utils/index";
import { get } from "lodash";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import LeagueContainerLeft from "./league-container-left";
import LeagueContainerRight from "./league-container-right";
import LeagueFormLegend from "./misc/league-form-legend";
import { buildPayloadLeagueTab } from "./misc/league-help";
import LeagueIgnore from "./misc/league-ignore";
// Loading

export interface IFromLeagueValue extends IFilterLineTypeEntity {
  periodConfig: IFilterPeriodEntity[];
}
const defaultValues: IFromLeagueValue = {
  dgsLeagueId: -1,
  type: FilterTypeEnum.LEAGUE,
  lineTypeId: 0,
  dgsGameId: 0,
  dbSportsBookId: 0,
  enabled: false,
  // useDGSLinkedLineTypes: false,
  preserveFavoriteJuice: false,
  dbLeagueId: null,
  periodConfig: [],
  autoTimeChange: false,
  ignoreMLHigher: null,
  ignorePSHigher: null,
  ignoreTotalHigher: null,
  ignoreMLLower: null,
  ignorePSLower: null,
  ignoreTotalLower: null,
  ignoreTotalJuiceHigher: null,
  ignoreTotalJuiceLower: null,
  ignorePSJuiceHigher: null,
  ignorePSJuiceLower: null,
  ignorePSTD: false,
  ignoreMLTD: false,
  ignoreTotalTD: false,
  ignorePSJCTD: false,
  ignoreTotalJCTD: false,
  ignoreMLRangeTD: false,
  ignoreMLRangeHigher: null,
  ignoreMLRangeLower: null,
  useOddsBySports: false,
  id: 0,
  dbSportId: 0,
  autoScore: false,
};
function LeagueformContent() {
  // eslint-disable-next-line operator-linebreak
  const [leagueInfoTree, listLineType, listSportBook, defaultFilterLineTypeSetting, defaultFilterPeriodSetting] = useAppSelector(
    (reduxState: RootStateType) => [
      getLeagueLeftInfoTree(reduxState),
      getListLineType(reduxState),
      getListSportBook(reduxState),
      getDefaultFilterLineTypeSetting(reduxState),
      getDefaultFilterPeriodSetting(reduxState),
    ],
    shallowEqual,
  );
  const leagueInfoList = React.useMemo(() => {
    return Object.values(leagueInfoTree);
  }, [leagueInfoTree]);
  const selectedLeagueData = useAppSelector(getSelectedLeague, shallowEqual);
  const confirm = useConfirm();
  const hookForm = useForm({ defaultValues });

  const watchdgsLeagueId = hookForm.watch("dgsLeagueId");
  const watchLineTypeId = hookForm.watch("lineTypeId");
  const watchBookId = hookForm.watch("dbSportsBookId");

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const dgsLeagueId = selectedLeagueData.dgsLeagueId ? selectedLeagueData.dgsLeagueId : -1;
    const itemTmp = selectedLeagueData.defaultSelectedLineType ? get(selectedLeagueData.mapFilterLineTypeConfig, selectedLeagueData.defaultSelectedLineType) : null;
    let item: IFilterLineTypeEntity | null = itemTmp || null;

    if (item === null) {
      item = defaultFilterLineTypeSetting;
    }
    if (item !== null) {
      item = { ...item, dgsLeagueId };
      const itemPeriodsTmp = get(selectedLeagueData.mapFilterPeriodConfig, item.lineTypeId);
      const itemPeriods = itemPeriodsTmp || defaultFilterPeriodSetting || [];
      const dbSportsBookId = itemPeriods.length > 0 ? itemPeriods[0].dbSportBookId : 0;
      hookForm.reset({ ...item, periodConfig: itemPeriods, dbSportsBookId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeagueData.dgsLeagueId]);

  React.useEffect(() => {
    const itemTmp = get(selectedLeagueData.mapFilterLineTypeConfig, watchLineTypeId);
    const item: IFilterLineTypeEntity | null = itemTmp || null;
    if (item !== null) {
      const itemPeriods = get(selectedLeagueData.mapFilterPeriodConfig, item.lineTypeId);
      const dbSportsBookId = itemPeriods ? itemPeriods[0].dbSportBookId : 0;
      hookForm.reset({ ...item, periodConfig: itemPeriods, dbSportsBookId });
    } else {
      const periodsVal = hookForm.getValues("periodConfig");
      const arrImmutableVersion = periodsVal.map((e) => ({ ...e, lineTypeId: watchLineTypeId }));
      hookForm.setValue("periodConfig", arrImmutableVersion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchLineTypeId]);

  React.useEffect(() => {
    if (watchBookId === undefined) {
      return;
    }
    const periodsVal = hookForm.getValues("periodConfig");
    const arrImmutableVersion = periodsVal.map((e) => ({
      ...e,
      dbSportBookId: watchBookId,
    }));
    hookForm.setValue("periodConfig", arrImmutableVersion);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchBookId]);

  const onSubmit = (data: IFromLeagueValue) => {
    const payload = buildPayloadLeagueTab(data, leagueInfoTree);
    emitStartLoading();
    diRepositorires.donbestFilter
      .postSaveLeagueFilters(payload)
      .then(() => {
        emitStopLoading();
        dispatch(
          selectLeagueIdRefresh({
            dgsLeagueId: watchdgsLeagueId,
            defaultSelectedLineType: `${data.lineTypeId}`,
          }),
        );
        notifyMessageSuccess("Save success!");
      })
      .catch(() => {
        notifyMessageError("Save failure! please try again.");
        emitStopLoading();
      });
  };

  const onSyncLines = () => {
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        const data: IFromLeagueValue = hookForm.getValues();
        const payload = buildPayloadLeagueTab(data, leagueInfoTree);
        emitStartLoading();
        diRepositorires.donbestFilter
          .postSaveLeagueFilters(payload)
          .then(() => {
            diRepositorires.donbestFilter
              .postSyncLines(data.dgsLeagueId)
              .then(() => {
                emitStopLoading();
                notifyMessageSuccess("Sync Lines success!");
              })
              .catch(() => {
                notifyMessageError("Sync Lines failure! please try again.");
                emitStopLoading();
              });
          })
          .catch(() => {
            notifyMessageError("Sync failure! please try again.");
            emitStopLoading();
          });
      }
    });
  };

  const onSyncTimes = (): void => {
    // eslint-disable-next-line no-alert
    alert("onSyncTimes");
  };

  const onSyncScores = (): void => {
    // eslint-disable-next-line no-alert
    alert("onSyncTimes");
  };
  const onSyncGames = (): void => {
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        const data: IFromLeagueValue = hookForm.getValues();
        const payload = buildPayloadLeagueTab(data, leagueInfoTree);
        emitStartLoading();
        diRepositorires.donbestFilter
          .postSaveLeagueFilters(payload)
          .then(() => {
            diRepositorires.donbestFilter
              .postSyncLeagueGame(data.dgsLeagueId)
              .then(() => {
                emitStopLoading();
                notifyMessageSuccess("Sync Game success!");
              })
              .catch(() => {
                notifyMessageError("Sync Game failure! please try again.");
                emitStopLoading();
              });
          })
          .catch(() => {
            notifyMessageError("Sync failure! please try again.");
            emitStopLoading();
          });
      }
    });
  };

  const onDelete = (): void => {
    const data: IFromLeagueValue = hookForm.getValues();
    const deleteFunc = () => {
      emitStartLoading();
      const payload: IFilterDeleteItemPayload = {
        dgsIdLeague: data.dgsLeagueId,
        type: FilterTypeEnum.LEAGUE,
        dgsGameId: 0,
        lineTypeId: data.lineTypeId,
      };
      diRepositorires.donbestFilter
        .postDeleteFilterItem(payload)
        .then(() => {
          emitStopLoading();
          dispatch(
            selectLeagueIdRefresh({
              dgsLeagueId: watchdgsLeagueId,
              defaultSelectedLineType: 0,
              clearSelectedGame: true,
            }),
          );
          notifyMessageSuccess("Deleted success!");
        })
        .catch(() => {
          notifyMessageError("Deleted failure! please try again.");
          emitStopLoading();
        });
    };
    if (data.dgsLeagueId > 0 && data.lineTypeId > 0) {
      confirm({ description: "Delete your selection?" })
        .then(() => deleteFunc())
        .catch(() => console.log("Deletion cancelled."));
    }
  };
  return (
    <fieldset>
      <LeagueFormLegend dgsLeagueId={watchdgsLeagueId || -1} lineTypeId={watchLineTypeId || -1} />
      {/* <legend>
        Line Type: {currentLineType ? currentLineType.description : ""} -League:{" "}
        {currentDgsLeague ? currentDgsLeague.dgsLeague.description : ""}
      </legend> */}
      <FormProvider {...hookForm}>
        <form onSubmit={hookForm.handleSubmit(onSubmit)}>
          <Grid spacing={gridSpacing} container>
            <Grid item md={10}>
              <LeagueContainerLeft
                leagueInfoList={leagueInfoList}
                listLineType={listLineType}
                listSportBook={listSportBook}
                savedLineTypeConfig={selectedLeagueData.mapFilterLineTypeConfig}
              />
              <LeagueIgnore />
            </Grid>
            <Grid item md={2}>
              <LeagueContainerRight
                isExistsItem={checkExistsItemIntree(selectedLeagueData.mapFilterLineTypeConfig, watchLineTypeId)}
                onSyncLines={onSyncLines}
                onSyncTimes={onSyncTimes}
                onSyncScores={onSyncScores}
                onSyncGames={onSyncGames}
                onDelete={onDelete}
                leagueInfoList={leagueInfoList}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </fieldset>
  );
}

export function Leagueform() {
  const leagueIdSelected: number | null = useAppSelector(getSelectedLeagueId);
  return leagueIdSelected !== null ? <LeagueformContent /> : <b>Please Select league!</b>;
}

// export function Leagueform() {
//   return (
//     <fieldset>
//       <legend>Line Type:-League: 2123123</legend>
//       <Grid spacing={gridSpacing} container>
//         <Grid item md={10}>
//           <LeagueIgnore />
//           <LeagueLockOdds />
//         </Grid>
//         <Grid item md={2}></Grid>
//       </Grid>
//     </fieldset>
//   );
// }
