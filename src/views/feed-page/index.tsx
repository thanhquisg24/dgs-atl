// material-ui
import { Grid } from "@mui/material";

// project imports
import { gridSpacing } from "@store/constant";
import { RecentCardWithSocket } from "@ui-component/activity-card/RecentCardWithSocket";
import AlertRefresh from "./alert-refresh";
import DgsScheduleCard from "./dgs-schedule-card";
import RightSideCard from "./right-side-card";
import LeagueGameTabs from "./tabs";
// ==============================|| SAMPLE PAGE ||============================== //

const FeedPage = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={3}>
      <AlertRefresh />
      <DgsScheduleCard />
      <RecentCardWithSocket />
    </Grid>
    <Grid item xs={9}>
      <RightSideCard>
        <LeagueGameTabs />
      </RightSideCard>
    </Grid>
  </Grid>
);

export default FeedPage;
