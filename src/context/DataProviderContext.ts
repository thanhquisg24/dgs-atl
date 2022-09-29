import { DataProvider } from "@adapters/infrastructures/type";
import { createContext } from "react";

const DataProviderContext = createContext<DataProvider | null>(null);

DataProviderContext.displayName = "DataProviderContext";

export default DataProviderContext;
