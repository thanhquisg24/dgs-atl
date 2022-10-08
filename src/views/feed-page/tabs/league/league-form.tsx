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
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { RootStateType } from "@store/types";
import { selectLeagueIdRequest } from "@store/actions";
import { FilterTypeEnum, IFilterLineTypeEntity } from "@adapters/entity";
import { get } from "lodash";
import LeagueFormLegend from "./misc/league-form-legend";
// Loading

type IFromValue = IFilterLineTypeEntity;
const defaultValues: IFromValue = {
  dgsLeagueId: -1,
  id: null,
  type: FilterTypeEnum.LEAGUE,
  lineTypeId: 0,
  dgsGameId: null,
  bookId: 0,
  enabled: false,
  time1Enabled: false,
  time1Start: "",
  time1End: "",
  autoScore: false,
  autoScoreOffset: 0,
  autoTimeChange: false,
  autoTimeChangeOffset: 0,
  useOddsBySports: false,
  useDGSLinkedLineTypes: false,
  preserveFavoriteJuice: false,
  ignoreMLOver: 0,
  ignorePSOver: 0,
  ignoreTotalOver: 0,
  ignoreMLUnder: 0,
  ignorePSUnder: 0,
  ignoreTotalUnder: 0,
  ignoreTotalJuiceOver: 0,
  ignoreTotalJuiceUnder: 0,
  ignorePSJuiceOver: 0,
  ignorePSJuiceUnder: 0,
  showFlatLine: false,
  useRounding: false,
  ignorePSTD: false,
  ignoreMLTD: false,
  ignoreTotalTD: false,
  ignorePSJCTD: false,
  ignoreTotalJCTD: false,
  r1: 0,
  r2: 0,
  r3: 0,
  r4: 0,
  r6: 0,
  r7: 0,
  r8: 0,
  r9: 0,
  followParentExcept: false,
  byPassSyncWhenTD: false,
  lockPSAwayJuice: 0,
  lockPSHomeJuice: 0,
  lockTotalOverJuice: 0,
  lockTotalUnderJuice: 0,
  totalGoToOverUnderRotation: false,
  roundingOnPS: false,
  roundingOnML: false,
  roundingOnTotal: false,
  ignoreTeamTotalTD: false,
  ignoreTeamTotalJCTD: false,
  ignoreTeamTotalUnder: 0,
  ignoreTeamTotalOver: 0,
  ignoreTeamTotalJuiceOver: 0,
  ignoreTeamTotalJuiceUnder: 0,
  ignoreMLRangeTD: false,
  ignoreMLRangeOver: 0,
  ignoreMLRangeUnder: 0,
  ignorePSSpecific: 0,
  dbGameId: null,
  dbLeagueId: null,
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
  const watchBookId = hookForm.watch("bookId");

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (watchdgsLeagueId && watchdgsLeagueId !== -1) {
      console.log("🚀 ~ file: league-form.tsx ~ line 114 ~ React.useEffect ~ watchdgsLeagueId", watchdgsLeagueId);
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
      hookForm.reset({ ...item });
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
      console.log("🚀 ~ file: league-form.tsx ~ line 142 ~ React.useEffect ~ null", null);
      hookForm.reset({ ...item });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchLineTypeId, selectedLeagueData.mapFilterLineTypeConfig]);
  React.useEffect(() => {
    const keyLinePeriod = `${watchLineTypeId}_${watchBookId}`;
    const itemTmp = get(selectedLeagueData.mapFilterLineTypeConfig, keyLinePeriod);
    const item: IFilterLineTypeEntity | null = itemTmp || null;
    if (item !== null) {
      console.log("🚀 ~ file: league-form.tsx ~ line 152 ~ React.useEffect ~ null", null);
      hookForm.reset({ ...item });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchBookId, selectedLeagueData.mapFilterLineTypeConfig]);
  const onSubmit = (data: any) => console.log(data);
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
  const isLoading: boolean = useAppSelector((state) => state.feed.isLoading);

  return leagueIdSelected !== null ? <LeagueformContent /> : <b>Please Select league!</b>;
}
