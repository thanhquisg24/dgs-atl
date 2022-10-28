import React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { getNotifyCurrentTaskSelector } from "@store/selector";

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//     backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
//   },
// }));

// Inspired by the former Facebook spinners.
// function FacebookCircularProgress(props: CircularProgressProps) {
//   return (
//     <Box sx={{ position: "relative" }}>
//       <CircularProgress
//         variant="determinate"
//         sx={{
//           color: (theme) => theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//         }}
//         size={40}
//         thickness={4}
//         {...props}
//         value={100}
//       />
//       <CircularProgress
//         variant="indeterminate"
//         disableShrink
//         sx={{
//           color: (theme) => (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"),
//           animationDuration: "550ms",
//           position: "absolute",
//           left: 0,
//           [`& .${circularProgressClasses.circle}`]: {
//             strokeLinecap: "round",
//           },
//         }}
//         size={40}
//         thickness={4}
//         {...props}
//       />
//     </Box>
//   );
// }

export default function SyncProgressBars() {
  const currentTask = useAppSelector(getNotifyCurrentTaskSelector);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#fafafa", padding: "20px 20px 20px 25px" }}>
      {currentTask !== null ? (
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <CircularProgress color="secondary" size={20} />
          <Typography variant="h4" color="secondary">
            {currentTask}
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
          <Typography variant="h4" color="success">
            No task running
          </Typography>
        </Stack>
      )}
      {/* <BorderLinearProgress variant="determinate" value={50} /> */}
    </Box>
  );
}
