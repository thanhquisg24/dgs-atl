import * as React from "react";
import { gridSpacing } from "@store/constant";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

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
          <Grid container spacing={1} sx={{ mt: 2.5 }}>
            <Grid item md={4}>
              <FormControl fullWidth>
                <Select variant="filled" value={10} label="Age">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <Select label="Spread" value={20} variant="filled" fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>DONBEST ALM</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
            <Grid item md={4}>
              <Select label="Spread" value={20} variant="filled" fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>BETOL</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
