// material-ui

// project imports
import { CardContent, Grid } from "@mui/material";
import { gridSpacing } from "@store/constant";
import MainCard from "@ui-component/cards/MainCard";
import CustomizedTreeView from "./tree-view";
import SyncProgressBars from "./tree-view/process-bar";
import TaskList from "./tree-view/task-list";
// ==============================|| SAMPLE PAGE ||============================== //

const DgsScheduleCard = () => (
  <>
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
            <CustomizedTreeView />
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
    <MainCard content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            {/* <Divider sx={{ my: 1.5 }} /> */}
            <SyncProgressBars />
            <TaskList />
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  </>
);

export default DgsScheduleCard;
