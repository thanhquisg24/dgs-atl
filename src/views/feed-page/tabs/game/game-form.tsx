import { useAppSelector } from "@hooks/useReduxToolKit";
import { Button, Grid, Typography } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { getSelectedGameId } from "@store/selector";
import { GameOddTitle } from "./game-odd-title";
import { GameOddsRow } from "./game-odds-row";
import GameSportbookSelect from "./game-sportbook-select";

export function GameFormContent() {
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
          {/* <Grid item md={12} sx={{ mt: 3.5, mb: 3.5 }}>
          </Grid> */}
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
      <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 3.5 }}>
        <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
          Sync Odds
        </Button>
        <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
          Use Default
        </Button>
        <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
          Apply
        </Button>
      </Grid>
    </fieldset>
  );
}

export function GameForm() {
  const gameIdSelected: number | null = useAppSelector(getSelectedGameId);
  const isLoading: boolean = useAppSelector((state) => state.feed.isLoading);
  if (isLoading) return <b>Loading...</b>;

  return gameIdSelected !== null ? <GameFormContent /> : <b>Please Select game!</b>;
}
