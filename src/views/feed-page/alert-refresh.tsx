import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { Alert, Button } from "@mui/material";
import { rereshDataAction } from "@store/actions";
import { getNotifyTaskMessagesSelector } from "@store/selector";
import React from "react";

const BtnRefresh = ({ onRefresh }: any) => {
  const [counter, setCounter] = React.useState(7);

  // Third Attempts
  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter((c) => c - 1), 1000);
    if (counter === 0) {
      onRefresh();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <Button color="inherit" size="small" onClick={() => onRefresh()}>
      {counter} Refresh
    </Button>
  );
};

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
    <Alert severity="info" variant="filled" action={<BtnRefresh onRefresh={onRefresh}></BtnRefresh>}>
      Setting has been changed!
    </Alert>
  ) : (
    <></>
  );
}
