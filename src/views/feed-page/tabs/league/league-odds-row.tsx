import { Checkbox, FormControl, FormControlLabel, Grid, MenuItem, Select } from "@mui/material";
import { LeaguePtsItem } from "./league-pts-item";

export function LeagueOddsRow() {
  return (
    <Grid container spacing={1} sx={{ mt: 2.5 }}>
      {/* <Grid item md={2}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="FG On" />
    </Grid> */}
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}>
            <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="FG On" />
          </Grid>
          <Grid item md={8}>
            <FormControl fullWidth>
              <Select size="small" variant="filled" value={10} label="Age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <LeaguePtsItem showPts />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <FormControl fullWidth>
              <Select size="small" variant="filled" value={10} label="Age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <LeaguePtsItem showPts={false} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <FormControl fullWidth>
              <Select size="small" variant="filled" value={10} label="Age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <LeaguePtsItem showPts />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
