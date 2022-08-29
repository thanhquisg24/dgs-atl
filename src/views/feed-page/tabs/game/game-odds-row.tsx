import { Checkbox, FormControl, FormControlLabel, Grid, MenuItem, Select } from "@mui/material";
import { GamePtsItem } from "./game-pts-item";

export function GameOddsRow() {
  return (
    <Grid container spacing={1} sx={{ mt: 2.5 }}>
      {/* <Grid item md={2}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="FG On" />
    </Grid> */}
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}>
            <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Active" />
          </Grid>
          <Grid item md={8}>
            <FormControl fullWidth>
              <Select size="small" value={10} displayEmpty inputProps={{ "aria-label": "Without label" }}>
                <MenuItem value={10}>ten20</MenuItem>
                <MenuItem value={20}>Twenty 20</MenuItem>
                <MenuItem value={30}>Thirty20</MenuItem>
              </Select>
            </FormControl>
            <GamePtsItem showPts />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <FormControl fullWidth>
              <Select size="small" value={10} displayEmpty inputProps={{ "aria-label": "Without label" }}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <GamePtsItem showPts={false} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <FormControl fullWidth>
              <Select size="small" value={10} displayEmpty inputProps={{ "aria-label": "Without label" }}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <GamePtsItem showPts />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
