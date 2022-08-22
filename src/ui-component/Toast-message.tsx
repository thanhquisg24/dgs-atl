import { AppEmitter, NOTIFY } from "@emiter/AppEmitter";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import * as React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IState {
  message: string;
  description: null | JSX.Element | string;
  show: boolean;
  arletColor: AlertColor | undefined;
}
export function ToastMessage() {
  const [state, setState] = React.useState<IState>({
    message: "",
    description: null,
    show: false,
    arletColor: "info",
  });
  React.useEffect(() => {
    const listenerNotify = (emitObj: { type: AlertColor; msg: string; description?: string | JSX.Element }): void => {
      if (emitObj) {
        setState({
          arletColor: emitObj.type,
          show: true,
          message: emitObj.msg,
          description: emitObj.description ? emitObj.description : null,
        });
      }
    };
    AppEmitter.on(NOTIFY, listenerNotify);
    return () => {
      AppEmitter.off(NOTIFY, listenerNotify);
    };
  }, []);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, show: false });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={state.show}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={state.arletColor} sx={{ width: "100%" }}>
          {state.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
