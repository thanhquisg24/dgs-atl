import { Grid } from "@mui/material";
import { gridSpacing } from "@store/constant";
import LeagueContainerLeft from "./league-container-left";
import LeagueContainerRight from "./league-container-right";

export function Leagueform() {
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
