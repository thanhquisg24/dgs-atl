import { Grid, TextField } from "@mui/material";
import { gridSpacing } from "@store/constant";

export default function LeagueLockOdds() {
  return (
    <Grid spacing={gridSpacing} container>
      <Grid item md={3}></Grid>
      <Grid item md={9}>
        <fieldset style={{ padding: "20px", marginTop: "20px" }}>
          <legend>Lock Odds</legend>

          <Grid container spacing={gridSpacing}>
            <Grid item md={4}>
              <TextField label="Required" defaultValue="Hello World" size="small" fullWidth />
              <TextField label="Required" defaultValue="Hello World" size="small" fullWidth sx={{ mt: 1.5 }} />
            </Grid>
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <TextField label="Required" defaultValue="Hello World" size="small" fullWidth />
              <TextField label="Required" defaultValue="Hello World" size="small" fullWidth sx={{ mt: 1.5 }} />
            </Grid>
          </Grid>
        </fieldset>
      </Grid>
    </Grid>
  );
}
