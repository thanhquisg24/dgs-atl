import { Grid } from "@mui/material";
import { gridSpacing } from "@store/constant";
import LeagueContainerLeft from "./league-container-left";
import LeagueContainerRight from "./league-container-right";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import {
  getLeagueLeftInfoTree,
  getSelectedLeagueId,
  getListLineType,
  getListSportBook,
  getSelectedLeague,
  getDefaultFilterPeriodSetting,
  getDefaultFilterLineTypeSetting,
} from "@store/selector";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { RootStateType } from "@store/types";
import { selectLeagueIdRefresh, selectLeagueIdRequest } from "@store/actions";
import { FilterTypeEnum, IFilterLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { get, omit } from "lodash";
import LeagueFormLegend from "./misc/league-form-legend";
import { emitStartLoading, emitStopLoading, notifyMessageError, notifyMessageSuccess } from "@emiter/AppEmitter";
import { diRepositorires } from "@adapters/di";
import LeagueIgnore from "./misc/league-ignore";
import LeagueLockOdds from "./misc/league-lock-odds";
// Loading

interface IFromValue extends IFilterLineTypeEntity {
  periodConfig: IFilterPeriodEntity[];
}
const defaultValues: IFromValue = {
  dgsLeagueId: -1,
  type: FilterTypeEnum.LEAGUE,
  lineTypeId: 0,
  dgsGameId: 0,
  dbSportsBookId: 0,
  enabled: false,
  autoScore: false,
  useOddsBySports: false,
  useDGSLinkedLineTypes: false,
  preserveFavoriteJuice: false,
  followParentExcept: false,
  dbLeagueId: null,
  periodConfig: [],
  autoTimeChange: false,
  ignoreMLOver: null,
  ignorePSOver: null,
  ignoreTotalOver: null,
  ignoreMLUnder: null,
  ignorePSUnder: null,
  ignoreTotalUnder: null,
  ignoreTotalJuiceOver: null,
  ignoreTotalJuiceUnder: null,
  ignorePSJuiceOver: null,
  ignorePSJuiceUnder: null,
  ignorePSTD: false,
  ignoreMLTD: false,
  ignoreTotalTD: false,
  ignorePSJCTD: false,
  ignoreTotalJCTD: false,
  lockPSAwayJuice: null,
  lockPSHomeJuice: null,
  lockTotalOverJuice: null,
  lockTotalUnderJuice: null,
  ignoreTeamTotalTD: false,
  ignoreTeamTotalJCTD: false,
  ignoreTeamTotalUnder: null,
  ignoreTeamTotalOver: null,
  ignoreTeamTotalJuiceOver: null,
  ignoreTeamTotalJuiceUnder: null,
  ignoreMLRangeTD: false,
  ignoreMLRangeOver: null,
  ignoreMLRangeUnder: null,
};
function LeagueformContent() {
  // eslint-disable-next-line operator-linebreak
  const [leagueInfoTree, listLineType, listSportBook, defaultFilterLineTypeSetting, defaultFilterPeriodSetting] =
    useAppSelector(
      (reduxState: RootStateType) => [
        getLeagueLeftInfoTree(reduxState),
        getListLineType(reduxState),
        getListSportBook(reduxState),
        getDefaultFilterLineTypeSetting(reduxState),
        getDefaultFilterPeriodSetting(reduxState),
      ],
      shallowEqual,
    );
  const selectedLeagueData = useAppSelector(getSelectedLeague, shallowEqual);
  const hookForm = useForm({ defaultValues });

  const watchdgsLeagueId = hookForm.watch("dgsLeagueId");
  const watchLineTypeId = hookForm.watch("lineTypeId");
  const watchBookId = hookForm.watch("dbSportsBookId");

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (watchdgsLeagueId && watchdgsLeagueId !== -1) {
      dispatch(selectLeagueIdRequest(watchdgsLeagueId));
    }
  }, [dispatch, watchdgsLeagueId]);

  React.useEffect(() => {
    const dgsLeagueId = selectedLeagueData.dgsLeagueId ? selectedLeagueData.dgsLeagueId : -1;
    const itemTmp = selectedLeagueData.defaultSelectedLineType
      ? get(selectedLeagueData.mapFilterLineTypeConfig, selectedLeagueData.defaultSelectedLineType)
      : null;
    let item: IFilterLineTypeEntity | null = itemTmp || null;

    if (item === null) {
      item = defaultFilterLineTypeSetting;
    }
    if (item !== null) {
      item = { ...item, dgsLeagueId };
      const itemPeriodsTmp = get(selectedLeagueData.mapFilterPeriodConfig, item.lineTypeId);
      const itemPeriods = itemPeriodsTmp || defaultFilterPeriodSetting || [];
      hookForm.reset({ ...item, periodConfig: itemPeriods });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLeagueData.dgsLeagueId,
    selectedLeagueData.defaultSelectedLineType,
    selectedLeagueData.mapFilterLineTypeConfig,
  ]);
  React.useEffect(() => {
    const itemTmp = get(selectedLeagueData.mapFilterLineTypeConfig, watchLineTypeId);
    const item: IFilterLineTypeEntity | null = itemTmp || null;
    if (item !== null) {
      const itemPeriods = get(selectedLeagueData.mapFilterPeriodConfig, item.lineTypeId);
      hookForm.reset({ ...item, periodConfig: itemPeriods });
    } else {
      const periodsVal = hookForm.getValues("periodConfig");
      const arrImmutableVersion = periodsVal.map((e) => ({ ...e, lineTypeId: watchLineTypeId }));
      hookForm.setValue("periodConfig", arrImmutableVersion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchLineTypeId]);

  React.useEffect(() => {
    const keyLinePeriod = `${watchLineTypeId}_${watchBookId}`;
    const itemTmp = get(selectedLeagueData.mapFilterLineTypeConfig, keyLinePeriod);
    const item: IFilterLineTypeEntity | null = itemTmp || null;
    if (item !== null) {
      const itemPeriods = get(selectedLeagueData.mapFilterPeriodConfig, item.lineTypeId);
      hookForm.reset({ ...item, periodConfig: itemPeriods });
    } else {
      const periodsVal = hookForm.getValues("periodConfig");
      const arrImmutableVersion = periodsVal.map((e) => ({
        ...e,
        dbSportBookId: watchBookId,
      }));
      console.log("🚀 ~ file: league-form.tsx ~ line 152 ~ arrImmutableVersion ~ watchBookId", watchBookId);
      hookForm.setValue("periodConfig", arrImmutableVersion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchBookId]);

  const onSubmit = (data: IFromValue) => {
    const { dgsLeagueId } = data;
    console.log("🚀 ~ file: league-form.tsx ~ line 159 ~ onSubmit ~ data", data);
    const dbInfo = leagueInfoTree[dgsLeagueId];
    const filterPeriodReq = data.periodConfig.map((e) => ({
      ...e,
      lineTypeId: data.lineTypeId,
      dgsLeagueId,
      dbLeagueId: dbInfo.donbestLeague.idLeague,
    }));
    const filterLineTypeReq = {
      ...omit(data, ["periodConfig"]),
      filterLineTypeId: { lineTypeId: data.lineTypeId, dgsLeagueId },
    };
    filterLineTypeReq.dbLeagueId = dbInfo.donbestLeague.idLeague;
    filterLineTypeReq.dgsLeagueId = dgsLeagueId;
    emitStartLoading();
    diRepositorires.donbestFilter
      .postSaveLeagueFilters({ filterLineTypeReq, filterPeriodReq })
      .then(() => {
        emitStopLoading();
        dispatch(selectLeagueIdRefresh({ dgsLeagueId, defaultSelectedLineType: `${data.lineTypeId}` }));
        notifyMessageSuccess("Save success!");
      })
      .catch(() => {
        notifyMessageError("Save failure! please try again.");
        emitStopLoading();
      });
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
                leagueInfoList={Object.values(leagueInfoTree)}
                listLineType={listLineType}
                listSportBook={listSportBook}
              />
              <LeagueIgnore />
              <LeagueLockOdds />
            </Grid>
            <Grid item md={2}>
              <LeagueContainerRight />
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
