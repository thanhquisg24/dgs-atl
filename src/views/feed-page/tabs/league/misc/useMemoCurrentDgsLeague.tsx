import { getLeagueLeftInfoTree } from "@store/selector";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { ILeagueInfoModel } from "@store/models/feed-model";
import React from "react";

export function useMemoCurrentDgsLeague(dgsLeagueId: number): ILeagueInfoModel | null {
  const dgsLeagueTree = useAppSelector(getLeagueLeftInfoTree);
  const resut = React.useMemo(
    () => (dgsLeagueTree[dgsLeagueId] ? dgsLeagueTree[dgsLeagueId] : null),
    [dgsLeagueId, dgsLeagueTree],
  );
  return resut;
}
