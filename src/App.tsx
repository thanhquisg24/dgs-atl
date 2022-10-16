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
import DataProviderContext from "./context/DataProviderContext";
import { restProvider } from "@adapters/infrastructures/dataProvider";
import SimpleBackdrop from "@ui-component/loading-backdrop";
import { ConfirmProvider } from "material-ui-confirm";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state: RootStateType) => state.themes);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(appInitAction());
  }, [dispatch]);
  const finalDataProvider = React.useMemo(() => {
    return restProvider;
  }, []);

  return (
    <DataProviderContext.Provider value={finalDataProvider}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <ConfirmProvider>
              <Routes />
            </ConfirmProvider>
          </NavigationScroll>
          <SimpleBackdrop />
          <ToastMessage />
        </ThemeProvider>
      </StyledEngineProvider>
    </DataProviderContext.Provider>
  );
};

export default App;
