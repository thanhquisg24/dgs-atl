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
  const {
    queryStr,
    dependencyField,
    optionLabel = "title",
    optionValue = "id",
    debounce: debounceValue = 300,
    onSearchFromProp,
  } = props;

  const [search, setSearch] = React.useState<string>("");
  const [options, setOptions] = React.useState<{ list: Option[]; isFetching: boolean }>({
    list: [],
    isFetching: false,
  });
  const dataProvider = useDataProvider();
  //   const stringfyQuery = React.useMemo(() => JSON.stringify(query));
  const defaultQueryOnSuccess = React.useCallback(
    (data: any) => {
      setOptions({
        list: data.map((item: any) => ({
          label: item[optionLabel],
          id: item[optionValue],
        })),
        isFetching: false,
      });
    },
    [optionLabel, optionValue],
  );
  const queryMemo: IQueryParams = React.useMemo(() => JSON.parse(queryStr), [queryStr]);
  React.useEffect(() => {
    const query: IQueryParams = queryMemo;
    if (search !== "") {
      query.filter = { ...query.filter, q: search };
    }
    if (dependencyField ? get(query.filter, dependencyField) : false || dependencyField === undefined) {
      setOptions({
        list: [],
        isFetching: true,
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
