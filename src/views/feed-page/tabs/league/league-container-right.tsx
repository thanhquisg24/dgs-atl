import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function LeagueContainerRight() {
  const { control, register } = useFormContext();
  return (
    <Box sx={{ width: "100%" }}>
      <FormGroup>
        <Controller
          name="useOddsBySports"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox size="small" onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
              }
              label="Use Odds By Sport"
            />
          )}
        />
      </FormGroup>
      <Controller
        name="autoTimeChange"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox size="small" onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />}
            label="Auto Time Change"
          />
        )}
      />

      <Grid container sx={{ ml: 2.5 }} spacing={1}>
        <Grid item md={6}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ lineHeight: "60px", mt: 1 }}
          >
            <FormGroup>
              <TextField
                InputLabelProps={{ shrink: true }}
                {...register("autoTimeChangeOffset")}
                size="small"
                sx={{ maxWidth: "100px" }}
                label="Offset By"
              />
            </FormGroup>
            <Typography variant="body2" gutterBottom align="left" component="span">
              minutes
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Controller
        name="autoScore"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox size="small" onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />}
            label="Auto Score"
          />
        )}
      />
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
        <Button type="submit" variant="contained" sx={{ flex: 1, mt: 1 }} fullWidth>
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
