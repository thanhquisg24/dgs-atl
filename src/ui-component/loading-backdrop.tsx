import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { AppEmitter, END_LOADING, START_LOADING } from "@emiter/AppEmitter";

export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    const openLoad = () => {
      handleOpen();
    };
    const closeLoad = () => {
      handleClose();
    };
    AppEmitter.on(START_LOADING, openLoad);
    AppEmitter.on(END_LOADING, closeLoad);
    return () => {
      AppEmitter.off(START_LOADING, openLoad);
      AppEmitter.off(END_LOADING, closeLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
