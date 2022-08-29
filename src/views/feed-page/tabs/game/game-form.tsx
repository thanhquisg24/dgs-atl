import { Button, Grid, Typography } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { GameOddTitle } from "./game-odd-title";
import { GameOddsRow } from "./game-odds-row";
import GameSportbookSelect from "./game-sportbook-select";

export function GameForm() {
  return (
    <fieldset>
      <legend>Settings: Hassim Rahman vs Jake paul </legend>
      <Grid spacing={gridSpacing} container>
        <Grid item md={8}>
          <GameSportbookSelect />
          <GameOddTitle />
          <GameOddsRow />
          <Typography variant="h6" color="secondary" sx={{ mt: 3.5 }}>
            This event uses the league setting
          </Typography>
          <Grid item md={12} sx={{ mt: 3.5, mb: 3.5 }}>
            <Button variant="contained" sx={{ flex: 1 }}>
              Sync Odds
            </Button>
            <Button variant="contained" sx={{ flex: 1, ml: 1 }}>
              Use Default
            </Button>
            <Button variant="contained" sx={{ flex: 1, ml: 1 }}>
              Apply
            </Button>
          </Grid>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </fieldset>
  );
}