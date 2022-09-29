import { DataProvider } from "@adapters/infrastructures/type";
import { useContext } from "react";
import DataProviderContext from "../context/DataProviderContext";

export const useDataProvider = (): DataProvider => {
  const context = useContext(DataProviderContext);
  if (context == null) {
    throw new Error("Not Found DataProviderContext");
  } else {
    return context;
  }
};
