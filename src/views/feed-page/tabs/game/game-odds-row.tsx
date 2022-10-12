import { IDonbestSportBookEntity } from "@adapters/entity";
import { Checkbox, FormControl, FormControlLabel, Grid } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { LeaguePtsItem } from "../league/league-pts-item";
import SelectSportbookOdd from "../league/misc/select-sportbook-odd-row";

interface IProps {
  listSportBook: IDonbestSportBookEntity[];
}
export function GameOddsRow(props: IProps) {
  const { listSportBook } = props;
  const { control } = useFormContext();

  return (
    <Grid container spacing={1} sx={{ mt: 2.5 }} className="odd-row-1">
      <Grid item md={3} sx={{ pr: 5 }}>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Controller
              name="enabled"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox size="small" onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                  }
                  label="Active"
                />
              )}
            />
          </Grid>
          <Grid item md={12}>
            <FormControl fullWidth>
              <SelectSportbookOdd listSportBook={listSportBook} control={control} name="dbSportBookId" />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3} sx={{ pr: 5 }}>
        <FormControl fullWidth>
          <Controller
            name="ps"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                }
                label="Spread"
              />
            )}
          />
        </FormControl>
        <LeaguePtsItem showPts ptsName="ps_point" jcName="ps_juice" control={control} />
      </Grid>
      <Grid item md={3} sx={{ pr: 5 }}>
        <FormControl fullWidth>
          <Controller
            name="ml"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                }
                label="Money"
              />
            )}
          />
        </FormControl>
        <LeaguePtsItem showPts={false} ptsName="ml_point" jcName="ml_juice" control={control} />
      </Grid>
      <Grid item md={3} sx={{ pr: 5 }}>
        <FormControl fullWidth>
          <Controller
            name="total"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                }
                label="Total"
              />
            )}
          />
        </FormControl>
        <LeaguePtsItem showPts ptsName="total_point" jcName="total_juice" control={control} />
      </Grid>
    </Grid>
  );
}
