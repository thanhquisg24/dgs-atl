import { debounce, find, get } from "lodash";
import React from "react";
import { IQueryParams } from "../types/query-type";
import { useDataProvider } from "./useDataProvider";

interface IProps {
  queryStr: string;
  dependencyField?: string;
  optionLabel?: string;
  optionValue?: string;
  debounce?: number;
  onSearchFromProp?: (value: string) => string;
  defaultOption?: Option[];
}
interface Option {
  id: any;
  label: string;
}
interface IUseSelect {
  options: { list: Option[]; isFetching: boolean };
  onSearch?: (value: string) => void;
}
export function useSelect(props: IProps): IUseSelect {
  const { queryStr, dependencyField, optionLabel = "label", optionValue = "id", debounce: debounceValue = 300, onSearchFromProp, defaultOption } = props;

  const [search, setSearch] = React.useState<string>("");
  const [options, setOptions] = React.useState<{ list: Option[]; isFetching: boolean; count: number }>({
    list: [],
    isFetching: false,
    count: 0,
  });
  const dataProvider = useDataProvider();
  //   const stringfyQuery = React.useMemo(() => JSON.stringify(query));
  const defaultQueryOnSuccess = React.useCallback(
    (data: any) => {
      if (options.count === 0 && defaultOption) {
        const list = data.map((item: any) => ({
          label: item[optionLabel],
          id: item[optionValue],
        }));
        list.push(defaultOption[0]);
        setOptions({
          list,
          isFetching: false,
          count: 1,
        });
      } else {
        setOptions({
          list: data.map((item: any) => ({
            label: item[optionLabel],
            id: item[optionValue],
          })),
          isFetching: false,
          count: 1,
        });
      }
    },
    [options.count, defaultOption, optionLabel, optionValue],
  );
  const queryMemo: IQueryParams = React.useMemo(() => JSON.parse(queryStr), [queryStr]);
  React.useEffect(() => {
    const query: IQueryParams = queryMemo;
    if (search !== "") {
      console.log("🚀 ~ file: useSelect.tsx ~ line 64 ~ React.useEffect ~ search", search);
      query.filter = { ...query.filter, q: search };
    }
    if (dependencyField ? get(query.filter, dependencyField) : false || dependencyField === undefined) {
      setOptions({
        list: [],
        isFetching: true,
        count: 0,
      });
      dataProvider
        .getList(query.resource, {
          pagination: {
            page: query.page ? query.page : 1,
            perPage: query.perPage,
          },
          sort: query.sort,
          filter: query.filter,
        })
        .then((result) => defaultQueryOnSuccess(result.data))
        .catch(() => defaultQueryOnSuccess([]));
    }
    // return () => {
    //   defaultQueryOnSuccess([]);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryMemo, search, dependencyField]);
  const onSearch = (value: string | undefined) => {
    if (!value) {
      setSearch("");
      return;
    }

    if (onSearchFromProp) {
      setSearch(onSearchFromProp(value));
    } else {
      const q = find(options.list, { label: value });
      if (q) {
        return;
      }
      setSearch(value);
    }
  };
  return {
    onSearch: debounce(onSearch, debounceValue),
    options,
  };
}
