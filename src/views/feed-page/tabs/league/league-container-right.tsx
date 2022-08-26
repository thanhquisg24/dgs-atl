import { Box, FormGroup, FormControlLabel, Checkbox, Grid, Typography, TextField, Button } from "@mui/material";

export default function LeagueContainerRight() {
  return (
    <Box sx={{ width: "100%" }}>
      <FormGroup>
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Use Odds By Sport" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Bypass Sync When TD" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Show Flat Line" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Preserve Favorite Juice" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Round Number" />
      </FormGroup>
      <Grid container>
        <Grid container sx={{ ml: 2.5 }} spacing={1}>
          <Grid item md={6}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ lineHeight: "60px", mt: 1 }}
            >
              <Typography variant="body2" gutterBottom align="left" component="span">
                01
              </Typography>
              <Typography variant="body2" gutterBottom align="left" component="span">
                +
              </Typography>
              <TextField size="small" variant="filled" sx={{ maxWidth: "90px" }} />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ lineHeight: "60px", mt: 1 }}
            >
              <Typography variant="body2" gutterBottom align="left" component="span">
                02
              </Typography>
              <Typography variant="body2" gutterBottom align="left" component="span">
                +
              </Typography>
              <TextField size="small" variant="filled" sx={{ maxWidth: "90px" }} />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ lineHeight: "60px", mt: 1 }}
            >
              <Typography variant="body2" gutterBottom align="left" component="span">
                03
              </Typography>
              <Typography variant="body2" gutterBottom align="left" component="span">
                +
              </Typography>
              <TextField size="small" variant="filled" sx={{ maxWidth: "90px" }} />
            </Grid>
          </Grid>
          <Grid item md={2}></Grid>
          <Grid item md={4}>
            <FormGroup>
              <Typography variant="body2" gutterBottom align="left" component="span">
                Apply to
              </Typography>
              <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Spread" />
              <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Money" />
              <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Total" />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
      <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Auto Move Between" />
      <Grid container>
        <Grid container sx={{ ml: 2.5 }} spacing={1}>
          <Grid item md={6}>
            <TextField
              size="small"
              variant="filled"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              size="small"
              variant="filled"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
            />
          </Grid>
        </Grid>
      </Grid>
      <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Auto Time Change" />
      <Grid container>
        <Grid container sx={{ ml: 2.5 }} spacing={1}>
          <Grid item md={8}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ lineHeight: "60px", mt: 1 }}
            >
              <Typography variant="body2" gutterBottom align="left" component="span">
                Offset By
              </Typography>
              <TextField size="small" variant="filled" sx={{ maxWidth: "80px" }} />
              <Typography variant="body2" gutterBottom align="left" component="span">
                minutes
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Auto Score" />
      <Grid container direction="column" justifyContent="flex-start" alignItems="baseline" sx={{ maxWidth: "200px" }}>
        <Button variant="contained" sx={{ flex: 1, mt: 1 }} fullWidth>
          Sync Times
        </Button>
        <Button variant="contained" sx={{ flex: 1, mt: 1 }} fullWidth>
          Sync Scores
        </Button>
        <Button variant="contained" sx={{ flex: 1, mt: 1 }} fullWidth>
          Sync Lines
        </Button>
        <Button variant="contained" sx={{ flex: 1, mt: 1 }} fullWidth>
          Copy to Leagues
        </Button>
        <Button variant="contained" sx={{ flex: 1, mt: 1 }} fullWidth>
          Apply
        </Button>
      </Grid>
      {/* <FormGroup>
        <FormControlLabel control={<Button variant="outlined">Outlined</Button>} label="Use Odds By Sport" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Bypass Sync When TD" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Show Flat Line" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Preserve Favorite Juice" />
        <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Round Number" />
      </FormGroup> */}
    </Box>
  );
}
