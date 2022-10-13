import { Grid, TextField } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { Controller, useFormContext } from "react-hook-form";

export default function LeagueLockOdds() {
  const { control } = useFormContext();
  return (
    <Grid spacing={gridSpacing} container>
      <Grid item md={3}></Grid>
      <Grid item md={9}>
        <fieldset style={{ padding: "20px", marginTop: "20px" }}>
          <legend>Lock Odds</legend>

          <Grid container spacing={gridSpacing}>
            <Grid item md={4}>
              <Controller
                name="lockPSAwayJuice"
                control={control}
                render={({ field }) => <TextField {...field} size="small" label="Away" fullWidth />}
              />
              <Controller
                name="lockPSHomeJuice"
                control={control}
                render={({ field }) => <TextField {...field} size="small" label="Home" fullWidth sx={{ mt: 1.5 }} />}
              />
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <Controller
                name="lockTotalOverJuice"
                control={control}
                render={({ field }) => <TextField {...field} size="small" label="Away" fullWidth />}
              />
              <Controller
                name="lockTotalUnderJuice"
                control={control}
                render={({ field }) => <TextField {...field} size="small" label="Home" fullWidth sx={{ mt: 1.5 }} />}
              />
            </Grid>
          </Grid>
        </fieldset>
      </Grid>
    </Grid>
  );
}
