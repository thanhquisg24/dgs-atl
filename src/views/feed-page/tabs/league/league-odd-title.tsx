import { Grid, Typography } from "@mui/material";

export function LeagueOddTitle() {
  return (
    <Grid container spacing={1} sx={{ mt: 2.5 }}>
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <Typography variant="h6" gutterBottom align="center" component="span">
              Spread
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <Typography variant="h6" gutterBottom align="center" component="span">
              Money
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={1}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <Typography variant="h6" gutterBottom align="center" component="span">
              Total
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
