import { useAppSelector } from "@hooks/useReduxToolKit";
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getStepPts } from "@store/selector";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  showPts: boolean;
  ptsName: string;
  jcName: string;
  control: any;
  idSport?: string;
}
export function LeaguePtsItem(props: IProps) {
  const { showPts, ptsName, jcName, control } = props;
  const stepPts = useAppSelector(getStepPts);
  const arrStepPts = React.useMemo(() => {
    const arr = [];
    for (let index = -4; index <= 4; index += stepPts) {
      arr.push(index);
    }
    return arr;
  }, [stepPts]);
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <Grid container spacing={1} sx={{ mt: 0.5 }}>
      <Grid item md={6}>
        {showPts && (
          <Controller
            name={ptsName}
            control={control}
            rules={{
              min: {
                value: -4,
                message: "Min -4",
              },
              max: {
                value: 4,
                message: "Max 4",
              },
            }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id={`s_${ptsName}`}>pts</InputLabel>
                <Select
                  {...field}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
                  labelId={`s_${ptsName}`}
                  size="small"
                  label="pts"
                  variant="standard"
                  type="number"
                  inputProps={{
                    step: stepPts,
                    min: -4,
                    max: 4,
                  }}
                >
                  <MenuItem value=""></MenuItem>
                  {arrStepPts.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {errors[ptsName] && <FormHelperText error>{errors[ptsName]?.message}</FormHelperText>}
              </FormControl>
            )}
          />
        )}
      </Grid>
      <Grid item md={6}>
        <Controller
          name={jcName}
          control={control}
          render={({ field }) => (
            <>
              <TextField {...field} size="small" label="jc" variant="standard" type="number" />
              {errors[jcName] && <FormHelperText error>{errors[jcName]?.message}</FormHelperText>}
            </>
          )}
        />
      </Grid>
    </Grid>
  );
}
