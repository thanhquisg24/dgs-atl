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
// Loading

interface IFromValue extends IFilterLineTypeEntity {
  periodConfig: IFilterPeriodEntity[];
}
const defaultValues: IFromValue = {
  dgsLeagueId: -1,
  id: null,
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
    const itemTmp = selectedLeagueData.defaultSelectedLineType_BookId
      ? get(selectedLeagueData.mapFilterLineTypeConfig, selectedLeagueData.defaultSelectedLineType_BookId)
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
    selectedLeagueData.defaultSelectedLineType_BookId,
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
  }, [watchLineTypeId, selectedLeagueData.mapFilterLineTypeConfig, selectedLeagueData.mapFilterPeriodConfig]);

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
        ps_bookId: watchBookId,
        ml_bookId: watchBookId,
        total_bookId: watchBookId,
      }));
      hookForm.setValue("periodConfig", arrImmutableVersion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchBookId, selectedLeagueData.mapFilterLineTypeConfig, selectedLeagueData.mapFilterPeriodConfig]);

  const onSubmit = (data: IFromValue) => {
    const { dgsLeagueId } = data;
    const dbInfo = leagueInfoTree[dgsLeagueId];
    const filterPeriodReq = data.periodConfig.map((e) => ({
      ...e,
      lineTypeId: data.lineTypeId,
      dgsLeagueId,
      dbLeagueId: dbInfo.donbestLeague.idLeague,
    }));
    const filterLineTypeReq = omit(data, ["periodConfig"]);
    filterLineTypeReq.dbLeagueId = dbInfo.donbestLeague.idLeague;
    filterLineTypeReq.dgsLeagueId = dgsLeagueId;
    emitStartLoading();
    diRepositorires.donbestFilter
      .postSaveLeagueFilters({ filterLineTypeReq, filterPeriodReq })
      .then(() => {
        emitStopLoading();
        dispatch(selectLeagueIdRefresh(dgsLeagueId));
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
            <Grid item md={8}>
              <LeagueContainerLeft
                leagueInfoList={Object.values(leagueInfoTree)}
                listLineType={listLineType}
                listSportBook={listSportBook}
              />
            </Grid>
            <Grid item md={4}>
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
