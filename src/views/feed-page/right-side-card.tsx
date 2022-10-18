// material-ui

// project imports
import { CardContent, Grid } from "@mui/material";
import { gridSpacing } from "@store/constant";
import MainCard from "@ui-component/cards/MainCard";
// ==============================|| SAMPLE PAGE ||============================== //

const RightSideCard = ({ children }: any) => (
  <MainCard content={false}>
    <CardContent>
      <Grid container spacing={gridSpacing}>
        {/* <Grid item xs={12}>
          <Grid container alignContent="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4">Dgs Schedule</Typography>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12}>
          {/* <Divider sx={{ my: 1.5 }} /> */}
          {children}
        </Grid>
      </Grid>
    </CardContent>
  </MainCard>
);

export default RightSideCard;
