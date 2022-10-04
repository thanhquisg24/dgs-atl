import { Grid } from "@mui/material";
import { gridSpacing } from "@store/constant";
import LeagueContainerLeft from "./league-container-left";
import LeagueContainerRight from "./league-container-right";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { getSelectedLeagueId } from "@store/selector";
import React from "react";

// Loading
function LeagueformContent() {
  return (
    <fieldset>
      <legend>Line Type: 02 DONBEST ALM -League: MARJOR LEAGUE BASEBALL</legend>
      <Grid spacing={gridSpacing} container>
        <Grid item md={8}>
          <LeagueContainerLeft />
        </Grid>
        <Grid item md={4}>
          <LeagueContainerRight />
        </Grid>
      </Grid>
    </fieldset>
  );
}

export function Leagueform() {
  const leagueIdSelected: number | null = useAppSelector(getSelectedLeagueId);
  const isLoading: boolean = useAppSelector((state) => state.feed.isLoading);
  React.useEffect(() => {
    console.log("🚀 ~ file: league-form.tsx ~ line 31 ~ React.useEffect ~ conso");
  }, []);
  if (isLoading) return <b>Loading...</b>;

  return leagueIdSelected !== null ? <LeagueformContent /> : <b>Please Select league!</b>;
}
