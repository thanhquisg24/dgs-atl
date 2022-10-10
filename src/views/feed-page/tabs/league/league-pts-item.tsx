import { Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface IProps {
  showPts: boolean;
  ptsName: string;
  jcName: string;
  control: any;
}
export function LeaguePtsItem(props: IProps) {
  const { showPts, ptsName, jcName, control } = props;
  return (
    <Grid container spacing={1} sx={{ mt: 0.5 }}>
      <Grid item md={6}>
        {showPts && (
          <Controller
            name={ptsName}
            control={control}
            render={({ field }) => <TextField {...field} size="small" label="pts" variant="standard" />}
          />
        )}
      </Grid>
      <Grid item md={6}>
        <Controller
          name={jcName}
          control={control}
          render={({ field }) => <TextField {...field} size="small" label="jc" variant="standard" />}
        />
      </Grid>
    </Grid>
  );
}
