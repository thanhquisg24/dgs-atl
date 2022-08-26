// material-ui
import { Grid } from "@mui/material";

// project imports
import { gridSpacing } from "@store/constant";
import DgsScheduleCard from "./dgs-schedule-card";
import RightSideCard from "./right-side-card";
import BasicTabs from "./tabs";
// ==============================|| SAMPLE PAGE ||============================== //

const FeedPage = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={2}>
      <DgsScheduleCard />
    </Grid>
    <Grid item xs={10}>
      <RightSideCard>
        <BasicTabs />
      </RightSideCard>
    </Grid>
  </Grid>
);

export default FeedPage;
