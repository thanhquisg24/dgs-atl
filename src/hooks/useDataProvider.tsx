import { restProvider } from "@adapters/infrastructures/dataProvider";

export const useDataProvider = () => {
  const provider = restProvider;
  return provider;
};
