// material-ui
import { Grid } from "@mui/material";

// project imports
import { gridSpacing } from "@store/constant";
import BoxContent from "./box-content";
import RightSideCard from "../right-side-card";
// ==============================|| SAMPLE PAGE ||============================== //

const FeedHistoryPage = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <RightSideCard>
        <BoxContent />
      </RightSideCard>
    </Grid>
  </Grid>
);

export default FeedHistoryPage;
