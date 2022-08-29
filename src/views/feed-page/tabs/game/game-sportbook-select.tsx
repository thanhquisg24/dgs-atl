import { FormControl, InputLabel, Grid, MenuItem, Select, Typography } from "@mui/material";

export default function GameSportbookSelect() {
  return (
    <Grid container spacing={1}>
      <Grid item md={4}>
        <Typography variant="h6">(00 :00 / 07:00)</Typography>
      </Grid>
      <Grid item md={5}>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-select-small1">Line Type</InputLabel>
          <Select labelId="demo-select-small1" id="demo-select-small" value={10} label="Line Type">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={3}>
        <Select value={10} size="small" inputProps={{ "aria-label": "Without label" }} fullWidth>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>BETOL</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
}
