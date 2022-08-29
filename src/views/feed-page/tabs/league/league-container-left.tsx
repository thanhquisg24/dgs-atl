import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Select, Typography } from "@mui/material";
import { LeagueOddTitle } from "./league-odd-title";
import { LeagueOddsRow } from "./league-odds-row";

function SportBookSelect() {
  return (
    <Grid container spacing={1}>
      <Grid item md={5}>
        <Select value={10} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>MARJOR LEAGUE BASEBALL</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Grid>
      <Grid item md={4}>
        <Select value={10} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>DONBEST ALM</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Grid>
      <Grid item md={3}>
        <Select value={10} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>BETOL</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Grid>

      <Grid item md={5}>
        <Typography variant="h6" color="secondary" sx={{ lineHeight: "3em" }}>
          Linked From: None
        </Typography>
      </Grid>
      <Grid item md={4}>
        <FormControlLabel control={<Checkbox size="small" disabled />} label="Follow Except" />
      </Grid>
      <Grid item md={3}>
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Active" />
      </Grid>
    </Grid>
  );
}

export default function LeagueContainerLeft() {
  return (
    <Box sx={{ width: "100%" }}>
      <SportBookSelect />
      <LeagueOddTitle />
      <LeagueOddsRow />
      <LeagueOddsRow />
      <LeagueOddsRow />
      <LeagueOddsRow />
    </Box>
  );
}
