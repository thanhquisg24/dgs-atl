// import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
// import EarningCard from "./EarningCard";
// import PopularCard from "./PopularCard";
// import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
// import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
// import TotalIncomeLightCard from "./TotalIncomeLightCard";
// import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "@store/constant";
// import SyncProgressBars from "../../feed-page/tree-view/process-bar";
// import TaskList from "./task-list";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <h1>Hello</h1>
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
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <EarningCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//             <TotalOrderLineChartCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={12} sm={12} xs={12}>
//             <Grid container spacing={gridSpacing}>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeDarkCard isLoading={isLoading} />
//               </Grid>
//               <Grid item sm={6} xs={12} md={6} lg={12}>
//                 <TotalIncomeLightCard isLoading={isLoading} />
//               </Grid>
//             </Grid>
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
