import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import NavigationScroll from "./layout/NavigationScroll";
import React from "react";
import { RootStateType } from "./store/types";
import { ToastMessage } from "@ui-component/Toast-message";
import { useAppDispatch } from "@hooks/useReduxToolKit";
import { appInitAction } from "@store/actions";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state: RootStateType) => state.themes);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(appInitAction());
  }, [dispatch]);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
        <ToastMessage />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
