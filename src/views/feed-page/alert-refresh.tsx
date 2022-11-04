import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Alert, Button } from "@mui/material";
import { rereshDataAction } from "@store/actions";
import { getNotifyTaskMessagesSelector } from "@store/selector";
import React from "react";

export default function AlertRefresh() {
  const messages = useAppSelector(getNotifyTaskMessagesSelector);
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState(false);
  React.useEffect(() => {
    if (messages.length > 0) {
      const item = messages[0];
      if (item.status === "SUCCESS") {
        setState(true);
      }
    }
  }, [messages]);
  const onRefresh = () => {
    dispatch(rereshDataAction());
    setState(false);
  };
  return state ? (
    <Alert
      severity="info"
      variant="filled"
      action={
        <Button color="inherit" size="small" onClick={() => onRefresh()}>
          Refresh
        </Button>
      }
    >
      Setting has been changed!
    </Alert>
  ) : (
    <></>
  );
}
