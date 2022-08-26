import { Box, Grid, MenuItem, Select } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { LeagueOddTitle } from "./league-odd-title";
import { LeagueOddsRow } from "./league-odds-row";

export function Leagueform() {
  return (
    <Grid spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* <Divider sx={{ my: 1.5 }} /> */}
        <Box component="form" sx={{ width: "100%" }} noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item md={5}>
              <Select value={10} displayEmpty inputProps={{ "aria-label": "Without label" }} variant="filled" fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>MARJOR LEAGUE BASEBALL</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
            <Grid item md={4}>
              <Select value={10} displayEmpty inputProps={{ "aria-label": "Without label" }} variant="filled" fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>DONBEST ALM</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
            <Grid item md={3}>
              <Select value={10} displayEmpty inputProps={{ "aria-label": "Without label" }} variant="filled" fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>BETOL</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <LeagueOddTitle />
          <LeagueOddsRow />
          <LeagueOddsRow />
          <LeagueOddsRow />
          <LeagueOddsRow />
        </Box>
      </Grid>
    </Grid>
  );
}
