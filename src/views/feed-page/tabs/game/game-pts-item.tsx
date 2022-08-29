import { Grid, TextField } from "@mui/material";

interface IProps {
  showPts: boolean;
}
export function GamePtsItem(props: IProps) {
  const { showPts } = props;
  return (
    <Grid container spacing={1} sx={{ mt: 0.5 }}>
      <Grid item md={6}>
        {showPts && <TextField size="small" label="pts" variant="standard" />}
      </Grid>
      <Grid item md={6}>
        <TextField size="small" label="jc" variant="standard" />
      </Grid>
    </Grid>
  );
}
