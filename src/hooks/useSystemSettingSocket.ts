import { diInfrastructures } from "@adapters/di";
import { ISystemStatusEntity } from "@adapters/entity";
import React from "react";

interface IState {
  systemStatus: ISystemStatusEntity | null;
  isLoading: boolean;
}
const { socketIns } = diInfrastructures;
export function useSystemSettingSocket() {
  const [wsConnect, setWsConnect] = React.useState<{ isConnect: boolean }>({ isConnect: false });
  const [state, setState] = React.useState<IState>({
    systemStatus: null,
    isLoading: true,
  });

  const conect = () => {
    socketIns.connect().then(() => {
      setWsConnect({ isConnect: true });
    });
  };
  React.useEffect(() => {
    const disconect = () => {
      socketIns.disconnect();
    };
    conect();
    return () => disconect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValToState = React.useCallback((msg: string) => {
    setState({
      systemStatus: JSON.parse(msg),
      isLoading: false,
    });
  }, []);

  React.useEffect(() => {
    if (wsConnect.isConnect) {
      socketIns.onMessage("/topic/system-status", (msg: string | null) => {
        if (msg !== null) {
          setValToState(msg);
        }
      });
      socketIns.emit("", "/app/system-status");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsConnect.isConnect]);

  return state;
}
