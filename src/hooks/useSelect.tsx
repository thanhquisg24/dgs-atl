import { debounce } from "lodash";
import React from "react";
import { IQueryParams } from "../types/query-type";
import { useDataProvider } from "./useDataProvider";

interface IProps {
  queryStr: string;
  optionLabel?: string;
  optionValue?: string;
  debounce?: number;
  onSearchFromProp?: (value: string) => string;
}
interface Option {
  value: any;
  text: string;
}
interface IUseSelect {
  options: Option[];
  onSearch?: (value: string) => void;
}
export function useSelect(props: IProps): IUseSelect {
  const {
    queryStr,
    optionLabel = "title",
    optionValue = "id",
    debounce: debounceValue = 300,
    onSearchFromProp,
  } = props;

  const [search, setSearch] = React.useState<string>("");
  const [options, setOptions] = React.useState<Option[]>([]);
  const dataProvider = useDataProvider();
  //   const stringfyQuery = React.useMemo(() => JSON.stringify(query));
  const defaultQueryOnSuccess = (data: any) => {
    setOptions(
      data.data.map((item: any) => ({
        label: item[optionLabel],
        value: item[optionValue],
      })),
    );
  };
  const queryMemo: IQueryParams = React.useMemo(() => JSON.parse(queryStr), [queryStr]);
  React.useEffect(() => {
    const query: IQueryParams = queryMemo;
    if (search !== "") {
      query.filter = { ...query.filter, q: search };
    }
    dataProvider
      .getList(query.resource, {
        pagination: {
          page: query.page ? query.page : 1,
          perPage: query.perPage,
        },
        sort: query.sort,
        filter: query.filter,
      })
      .then((result) => defaultQueryOnSuccess(result.data));
    return () => {
      defaultQueryOnSuccess([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryMemo, search]);
  const onSearch = (value: string | undefined) => {
    if (!value) {
      setSearch("");
      return;
    }

    if (onSearchFromProp) {
      setSearch(onSearchFromProp(value));
    } else {
      setSearch(value);
    }
  };
  return {
    options,
    onSearch: debounce(onSearch, debounceValue),
  };
}
