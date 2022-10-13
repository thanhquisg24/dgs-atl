import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { gridSpacing } from "@store/constant";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IInputPeiceProp {
  higherName: string;
  lowerName: string;
  checkboxName: string;
  lowerTitle: string;
  higherTitle: string;
}

function IgnoreInputPeiceBettween(props: IInputPeiceProp) {
  const { higherName, lowerName, checkboxName, lowerTitle, higherTitle } = props;
  const { control, register } = useFormContext();
  return (
    <Grid container>
      <Grid item md={12}></Grid>
      <Grid item md={12} sx={{ mt: 1.5 }}>
        <Grid container>
          <Grid item md={5} sx={{ mt: 2, pr: 1 }}>
            <TextField
              {...register(lowerName)}
              InputLabelProps={{ shrink: true }}
              size="small"
              label={lowerTitle}
              fullWidth
            />
          </Grid>
          <Grid item md={5} sx={{ mt: 2, pl: 1 }}>
            <TextField
              {...register(higherName)}
              InputLabelProps={{ shrink: true }}
              size="small"
              label={higherTitle}
              fullWidth
            />
          </Grid>
          <Grid item md={2}>
            <Controller
              name={checkboxName}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  sx={{ ml: 0 }}
                  control={
                    <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                  }
                  label="TD"
                  labelPlacement="top"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function IgnoreInputPeice(props: IInputPeiceProp) {
  const { higherName, lowerName, checkboxName, lowerTitle, higherTitle } = props;
  const { control, register } = useFormContext();
  return (
    <Grid container>
      <Grid item md={10}>
        <TextField
          {...register(higherName)}
          InputLabelProps={{ shrink: true }}
          size="small"
          label={higherTitle}
          fullWidth
        />

        <TextField
          {...register(lowerName)}
          InputLabelProps={{ shrink: true }}
          label={lowerTitle}
          size="small"
          fullWidth
          sx={{ mt: 1.5 }}
        />
      </Grid>
      <Grid item md={2}>
        <Controller
          name={checkboxName}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
              }
              label="TD"
              labelPlacement="top"
            />
          )}
        />
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
              <IgnoreInputPeice
                higherName="ignorePSOver"
                lowerName="ignorePSUnder"
                checkboxName="ignorePSTD"
                lowerTitle="PS if Lower"
                higherTitle="PS if Higher"
              />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeice
                higherName="ignoreMLOver"
                lowerName="ignoreMLUnder"
                checkboxName="ignoreMLTD"
                lowerTitle="ML if Lower"
                higherTitle="ML if Higher"
              />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeice
                higherName="ignoreTotalOver"
                lowerName="ignoreTotalUnder"
                checkboxName="ignoreTotalTD"
                lowerTitle="TL if Lower"
                higherTitle="TL if Higher"
              />
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing} sx={{ mt: 2.5 }}>
            <Grid item md={4}>
              <IgnoreInputPeice
                higherName="JC if Higher"
                lowerName="JC if Lower"
                checkboxName="ignorePSJCTD"
                lowerTitle="JC if Lower"
                higherTitle="JC if Higher"
              />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeiceBettween
                higherName="ignoreMLRangeUnder"
                lowerName="ignoreMLRangeOver"
                checkboxName="ignoreMLRangeTD"
                lowerTitle="Between"
                higherTitle="and"
              />
            </Grid>
            <Grid item md={4}>
              <IgnoreInputPeice
                higherName="ignoreTotalJuiceOver"
                lowerName="ignoreTotalJuiceUnder"
                checkboxName="ignoreTotalJCTD"
                lowerTitle="JC if Lower"
                higherTitle="JC if Higher"
              />
            </Grid>
          </Grid>
        </fieldset>
      </Grid>
    </Grid>
  );
}
