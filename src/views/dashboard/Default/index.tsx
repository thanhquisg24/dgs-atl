// import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import { useAppSelector } from "@hooks/useReduxToolKit";
import { useSystemSettingSocket } from "@hooks/useSystemSettingSocket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { gridSpacing } from "@store/constant";
import { getAuthSelector } from "@store/selector";
import React from "react";
import RecentCard from "../../../ui-component/activity-card/RecentCard";
import WigetStatus from "./WigetStatus";

// ==============================|| DEFAULT DASHBOARD ||============================== //
// setState({
//   isLoading: false,
//   systemStatus: result,
// }),

const Dashboard = () => {
  const auth = useAppSelector(getAuthSelector);
  const data = useSystemSettingSocket();

  const statusObj: { donbestApi: "ERROR" | "SUCCESS"; donbestStream: "ERROR" | "SUCCESS" } = React.useMemo(() => {
    if (data.systemStatus !== null) {
      return { donbestApi: data.systemStatus.dbApiStatus > -1 ? "SUCCESS" : "ERROR", donbestStream: data.systemStatus.dbStreamStatus > -1 ? "SUCCESS" : "ERROR" };
    }
    return { donbestApi: "ERROR", donbestStream: "ERROR" };
  }, [data]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={2} md={6} sm={6} xs={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={data.isLoading} title={`Hello, ${auth.currentUser}`} subTitle="Admin" icon={<AccountCircleIcon fontSize="inherit" />} status="DEFAULT" />
              </Grid>
              {/* <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={data.isLoading} title="Socket Conntection Status" subTitle="Not connected" icon={<ErrorOutlineIcon fontSize="inherit" />} status="ERROR" />
              </Grid> */}
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus
                  isLoading={data.isLoading}
                  title="Donbest API"
                  subTitle={statusObj.donbestApi === "SUCCESS" ? "OK" : "Error!"}
                  icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                  status={statusObj.donbestApi}
                />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus
                  isLoading={data.isLoading}
                  title="Donbest Stream"
                  subTitle={statusObj.donbestStream === "SUCCESS" ? "Connected" : "Not connected!"}
                  icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                  status={statusObj.donbestStream}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={6}>
            <RecentCard isLoading={data.isLoading} idGames={data.systemStatus ? data.systemStatus.updatingGames : []} />
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
