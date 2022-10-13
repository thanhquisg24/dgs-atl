import { Grid, TextField } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { useFormContext } from "react-hook-form";

export default function LeagueLockOdds() {
  const { register } = useFormContext();
  return (
    <Grid spacing={gridSpacing} container>
      <Grid item md={3}></Grid>
      <Grid item md={9}>
        <fieldset style={{ padding: "20px", marginTop: "20px" }}>
          <legend>Lock Odds</legend>

          <Grid container spacing={gridSpacing}>
            <Grid item md={4}>
              <TextField
                {...register("lockPSAwayJuice")}
                id="lockPSAwayJuice"
                InputLabelProps={{ shrink: true }}
                size="small"
                label="Away"
                fullWidth
              />
              <TextField
                {...register("lockPSHomeJuice")}
                InputLabelProps={{ shrink: true }}
                id="lockPSHomeJuice"
                size="small"
                label="Home"
                fullWidth
                sx={{ mt: 1.5 }}
              />
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <TextField
                {...register("lockTotalOverJuice")}
                id="lockTotalOverJuice"
                InputLabelProps={{ shrink: true }}
                size="small"
                label="Away"
                fullWidth
              />
              <TextField
                {...register("lockTotalUnderJuice")}
                id="lockTotalUnderJuice"
                InputLabelProps={{ shrink: true }}
                size="small"
                label="Home"
                fullWidth
                sx={{ mt: 1.5 }}
              />
            </Grid>
          </Grid>
        </fieldset>
      </Grid>
    </Grid>
  );
}
