import { diRepositorires } from "@adapters/di";
import { IFilterDeleteItemPayload } from "@adapters/dto";
import { FilterTypeEnum, IFilterLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Grid } from "@mui/material";
import { taskChannelRequestAction } from "@store/actions";
import { gridSpacing } from "@store/constant";
import {
  Delete_league_Task_Type,
  Save_League_Task_Type,
  Sync_Game_Task_Type,
  Sync_Line_Task_Type,
  Sync_Scores_Task_Type,
  Sync_Times_Task_Type,
  TASK_TYPE,
} from "@store/feed-task-queue/FeedTaskQueueModel";
import { getDefaultFilterLineTypeSetting, getDefaultFilterPeriodSetting, getLeagueLeftInfoTree, getListLineType, getListSportBook, getSelectedLeague, getSelectedLeagueId } from "@store/selector";
import { RootStateType } from "@store/types";
import { checkExistsItemIntree } from "@utils/index";
import { get } from "lodash";
import { useConfirm } from "material-ui-confirm";
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
  lineTypeId: 0,
  type: FilterTypeEnum.LEAGUE,
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
  const isExistsItem = React.useMemo(() => checkExistsItemIntree(selectedLeagueData.mapFilterLineTypeConfig, watchLineTypeId), [selectedLeagueData.mapFilterLineTypeConfig, watchLineTypeId]);

  const initForm = React.useCallback(() => {
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
    initForm();
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

  const saveTask = (_data?: IFromLeagueValue) => {
    const data: IFromLeagueValue = _data || hookForm.getValues();
    const payload = buildPayloadLeagueTab(data, leagueInfoTree);
    const channelPayload: Save_League_Task_Type = {
      taskObject: `Save ${leagueInfoTree[data.dgsLeagueId].dgsLeague.description}`,
      taskType: TASK_TYPE.SAVE_LEAGUE,
      payload,
    };
    dispatch(taskChannelRequestAction(channelPayload));
  };
  const onReset = (): void => {
    initForm();
  };

  const onSubmit = (data: IFromLeagueValue) => {
    // const payload = buildPayloadLeagueTab(data, leagueInfoTree);
    // diRepositorires.donbestFilter.compareTwoLeagueFilter(payload).then((result) => {
    //   console.log("🚀 ~ file: league-form.tsx ~ line 155 ~ diRepositorires.donbestFilter.compareTwoLeagueFilter ~ result", result);
    // });
    saveTask(data);
  };
  const onComfirmSync = (data: IFromLeagueValue, funcCallback: () => void) => {
    const payload = buildPayloadLeagueTab(data, leagueInfoTree);
    diRepositorires.donbestFilter.compareTwoLeagueFilter(payload).then((result) => {
      if (result) {
        funcCallback();
      } else {
        confirm({ description: "Setting have made changes, continue to sync?" })
          .then(() => {
            saveTask(data);
            funcCallback();
          })
          .catch(() => console.log("Sync cancelled."));
      }
    });
  };
  const onSyncLines = () => {
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        const data: IFromLeagueValue = hookForm.getValues();
        const channelPayloadSyncLines: Sync_Line_Task_Type = {
          taskObject: `Sync ${leagueInfoTree[data.dgsLeagueId].dgsLeague.description}`,
          taskType: TASK_TYPE.SYNC_LINE,
          payload: { dgsLeagueId: data.dgsLeagueId },
        };
        onComfirmSync(data, () => dispatch(taskChannelRequestAction(channelPayloadSyncLines)));
      }
    });
  };
  const onSyncTimes = (): void => {
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        const data: IFromLeagueValue = hookForm.getValues();
        const channelPayloadSyncTime: Sync_Times_Task_Type = {
          taskObject: `Sync Times of ${leagueInfoTree[data.dgsLeagueId].dgsLeague.description}`,
          taskType: TASK_TYPE.SYNC_TIMES,
          payload: { dgsLeagueId: data.dgsLeagueId },
        };
        onComfirmSync(data, () => dispatch(taskChannelRequestAction(channelPayloadSyncTime)));
      }
    });
  };
  const onSyncScores = (): void => {
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        const data: IFromLeagueValue = hookForm.getValues();
        const channelPayloadSyncScore: Sync_Scores_Task_Type = {
          taskObject: `Sync Scores of ${leagueInfoTree[data.dgsLeagueId].dgsLeague.description}`,
          taskType: TASK_TYPE.SYNC_SCORE,
          payload: { dgsLeagueId: data.dgsLeagueId },
        };
        onComfirmSync(data, () => dispatch(taskChannelRequestAction(channelPayloadSyncScore)));
      }
    });
  };
  const onSyncGames = (): void => {
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        const data: IFromLeagueValue = hookForm.getValues();
        const channelPayloadSyncGames: Sync_Game_Task_Type = {
          taskObject: `Sync Games of ${leagueInfoTree[data.dgsLeagueId].dgsLeague.description}`,
          taskType: TASK_TYPE.SYNC_GAME,
          payload: { dgsLeagueId: data.dgsLeagueId },
        };
        onComfirmSync(data, () => dispatch(taskChannelRequestAction(channelPayloadSyncGames)));
      }
    });
  };
  const onDelete = (): void => {
    const data: IFromLeagueValue = hookForm.getValues();
    const deleteFunc = () => {
      // emitStartLoading();
      const payload: IFilterDeleteItemPayload = {
        dgsIdLeague: data.dgsLeagueId,
        type: FilterTypeEnum.LEAGUE,
        dgsGameId: 0,
        lineTypeId: data.lineTypeId,
      };
      const channelPayloadDeleteLeague: Delete_league_Task_Type = {
        taskObject: `Delete ${leagueInfoTree[data.dgsLeagueId].dgsLeague.description}`,
        taskType: TASK_TYPE.DELETE_LEAGUE,
        payload,
      };
      dispatch(taskChannelRequestAction(channelPayloadDeleteLeague));
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
      <FormProvider {...hookForm}>
        <form onSubmit={hookForm.handleSubmit(onSubmit)}>
          <Grid spacing={gridSpacing} container>
            <Grid item md={10}>
              <LeagueContainerLeft leagueInfoList={leagueInfoList} listLineType={listLineType} listSportBook={listSportBook} savedLineTypeConfig={selectedLeagueData.mapFilterLineTypeConfig} />
              <LeagueIgnore />
            </Grid>
            <Grid item md={2}>
              <LeagueContainerRight
                isExistsItem={isExistsItem}
                onSyncLines={onSyncLines}
                onSyncTimes={onSyncTimes}
                onSyncScores={onSyncScores}
                onSyncGames={onSyncGames}
                onDelete={onDelete}
                onReset={onReset}
                dgsSportId={selectedLeagueData.dgsSportId}
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
