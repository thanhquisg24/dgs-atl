// import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { gridSpacing } from "@store/constant";
import RecentCard from "./RecentCard";
import WigetStatus from "./WigetStatus";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={2} md={6} sm={6} xs={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={false} title="hello, CLIFF" subTitle="Admin" icon={<AccountCircleIcon fontSize="inherit" />} status="DEFAULT" />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={false} title="Socket Conntection Status" subTitle="Not connected" icon={<ErrorOutlineIcon fontSize="inherit" />} status="ERROR" />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={false} title="Donbest Token Status" subTitle="Connected" icon={<CheckCircleOutlineIcon fontSize="inherit" />} status="SUCCESS" />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={false} title="Donbest Stream Status" subTitle="Connected" icon={<CheckCircleOutlineIcon fontSize="inherit" />} status="SUCCESS" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} md={6} sm={6} xs={6}>
            <RecentCard isLoading={false} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// const Dashboard = () => {
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={12}>
// <Grid container spacing={gridSpacing}>
//   <Grid item lg={4} md={6} sm={6} xs={12}>
//     <EarningCard isLoading={isLoading} />
//   </Grid>
//   <Grid item lg={4} md={6} sm={6} xs={12}>
//     <TotalOrderLineChartCard isLoading={isLoading} />
//   </Grid>
//   <Grid item lg={4} md={12} sm={12} xs={12}>
//     <Grid container spacing={gridSpacing}>
//       <Grid item sm={6} xs={12} md={6} lg={12}>
//         <TotalIncomeDarkCard isLoading={isLoading} />
//       </Grid>
//       <Grid item sm={6} xs={12} md={6} lg={12}>
//         <TotalIncomeLightCard isLoading={isLoading} />
//       </Grid>
//     </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item xs={12} md={8}>
//             <TotalGrowthBarChart isLoading={isLoading} />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <PopularCard isLoading={isLoading} />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };
// const Dashboard = () => {
//   const dispatch = useAppDispatch();
//   const onTaskdemo = () => {
//     const payloada = {
//       taskObject: `demo ${Math.random()}`,
//     };
//     dispatch(taskChannelRequestAction(payloada));
//   };
//   return (
//     <Grid container spacing={gridSpacing}>
//       <Grid item xs={3}>
//         <button type="button" onClick={() => onTaskdemo()}>
//           demo
//         </button>
//         <SyncProgressBars />
//         <TaskList />
//       </Grid>
//     </Grid>
//   );
// };

export default Dashboard;
