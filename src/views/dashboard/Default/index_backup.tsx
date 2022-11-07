// import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { gridSpacing } from "@store/constant";
import RecentCard from "./RecentCard";
import WigetStatus from "./WigetStatus";
import { ISystemStatusEntity } from "@adapters/entity";
import React from "react";
import { diRepositorires } from "../../../adapters/di/index";
import { notifyMessageError } from "../../../emiter/AppEmitter";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { getAuthSelector } from "@store/selector";

// ==============================|| DEFAULT DASHBOARD ||============================== //
// setState({
//   isLoading: false,
//   systemStatus: result,
// }),
interface IState {
  isLoading: boolean;
  systemStatus: ISystemStatusEntity | null;
}
const Dashboard = () => {
  const auth = useAppSelector(getAuthSelector);
  const [state, setState] = React.useState<IState>({
    isLoading: false,
    systemStatus: null,
  });

  const loadStatus = React.useCallback(() => {
    diRepositorires.systemSettings
      .fetSystemStatus()
      .then((result) => {
        setState({
          isLoading: false,
          systemStatus: result,
        });
      })
      .catch((error) => {
        notifyMessageError(error.message);
      });
  }, []);

  React.useEffect(() => {
    loadStatus();
    const timer = setInterval(() => {
      loadStatus();
    }, 5000);
    return () => clearInterval(timer);
  }, [loadStatus]);
  const statusObj: { donbestApi: "ERROR" | "SUCCESS"; donbestStream: "ERROR" | "SUCCESS" } = React.useMemo(() => {
    if (state.systemStatus !== null) {
      return { donbestApi: state.systemStatus.dbApiStatus > -1 ? "SUCCESS" : "ERROR", donbestStream: state.systemStatus.dbStreamStatus > -1 ? "SUCCESS" : "ERROR" };
    }
    return { donbestApi: "ERROR", donbestStream: "ERROR" };
  }, [state]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={2} md={6} sm={6} xs={6}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={state.isLoading} title={`Hello, ${auth.currentUser}`} subTitle="Admin" icon={<AccountCircleIcon fontSize="inherit" />} status="DEFAULT" />
              </Grid>
              {/* <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus isLoading={state.isLoading} title="Socket Conntection Status" subTitle="Not connected" icon={<ErrorOutlineIcon fontSize="inherit" />} status="ERROR" />
              </Grid> */}
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus
                  isLoading={state.isLoading}
                  title="Donbest API"
                  subTitle={statusObj.donbestApi === "SUCCESS" ? "OK" : "Error!"}
                  icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                  status={statusObj.donbestApi}
                />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WigetStatus
                  isLoading={state.isLoading}
                  title="Donbest Stream"
                  subTitle={statusObj.donbestStream === "SUCCESS" ? "Connected" : "Not connected!"}
                  icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                  status={statusObj.donbestStream}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={6}>
            <RecentCard isLoading={state.isLoading} idGames={state.systemStatus ? state.systemStatus.updatingGames : []} />
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
