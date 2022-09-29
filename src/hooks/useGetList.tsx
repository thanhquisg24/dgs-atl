import React from "react";
import { IQueryParams } from "../types/query-type";
import { useDataProvider } from "./useDataProvider";

interface IState {
  data: any[];
  total: number;
}
export function useGetList(queryStr: string) {
  const [state, setState] = React.useState<IState>({
    data: [],
    total: 0,
  });
  const dataProvider = useDataProvider();
  //   const stringfyQuery = React.useMemo(() => JSON.stringify(query));
  React.useEffect(() => {
    const query: IQueryParams = JSON.parse(queryStr);
    dataProvider
      .getList(query.resource, {
        pagination: {
          page: query.page ? query.page : 1,
          perPage: query.perPage,
        },
        sort: query.sort,
        filter: query.filter,
      })
      .then((data) => setState(data));
    return () => {
      setState({ data: [], total: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStr]);

  return state;
}
