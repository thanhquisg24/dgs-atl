import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { gridSpacing } from "@store/constant";
import React from "react";

function IgnoreInputPeiceBettween() {
  return (
    <Grid container>
      <Grid item md={12}></Grid>
      <Grid item md={12} sx={{ mt: 1.5 }}>
        <Grid container>
          <Grid item md={5} sx={{ mt: 2, pr: 1 }}>
            <TextField label="Between" defaultValue="Hello World" size="small" fullWidth />
          </Grid>
          <Grid item md={5} sx={{ mt: 2, pl: 1 }}>
            <TextField label="and" defaultValue="Hello World" size="small" fullWidth />
          </Grid>
          <Grid item md={2}>
            <FormControlLabel sx={{ ml: 0 }} value="top" control={<Checkbox />} label="TD" labelPlacement="top" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function IgnoreInputPeice() {
  return (
    <Grid container>
      <Grid item md={10}>
        <TextField label="Required" defaultValue="Hello World" size="small" fullWidth />
        <TextField label="Required" defaultValue="Hello World" size="small" fullWidth sx={{ mt: 1.5 }} />
      </Grid>
      <Grid item md={2}>
        <FormControlLabel sx={{ ml: 0 }} value="top" control={<Checkbox />} label="TD" labelPlacement="top" />
      </Grid>
    </Grid>
  );
}
export default function LeagueIgnore() {
  return (
    <Grid spacing={gridSpacing} container>
      <Grid item md={3}></Grid>
      <Grid item md={9}>
        <fieldset style={{ padding: "20px" }}>
          <legend>Ignore</legend>

          <Grid container spacing={gridSpacing}>
            <Grid item md={4}>
              <IgnoreInputPeice />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeice />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeice />
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing} sx={{ mt: 2.5 }}>
            <Grid item md={4}>
              <IgnoreInputPeice />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeiceBettween />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeice />
            </Grid>
          </Grid>
        </fieldset>
      </Grid>
    </Grid>
  );
}
