import customAxios from "@adapters/infrastructures/axios/customeAxios";
import { Autocomplete, Box, FormControl, FormHelperText, TextField } from "@mui/material";
import React from "react";
import { stringify } from "querystring";

interface IProps {
  id: string;
  label?: string;
  size: "small" | "medium" | undefined;
  errorMsg?: string | any;
  sx?: any;
  registerProp?: any;
  idField: string;
  textField: string;
}
interface Option {
  id: any;
  label: string;
}
export default function DgsUserSelectbox(props: IProps) {
  const { label, size, errorMsg, sx, idField: optionValue, textField: optionLabel, registerProp } = props;

  const [options, setOptions] = React.useState<{ list: Option[]; isFetching: boolean }>({
    list: [],
    isFetching: false,
  });
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
  React.useEffect(() => {
    setOptions({
      list: [],
      isFetching: true,
    });
    const q = {
      sort: JSON.stringify(["loginName", "ASC"]),
      range: JSON.stringify([0, 500]),
      filter: JSON.stringify({}),
    };
    customAxios
      .get(`/dgs-user?${stringify(q)}`)
      .then((result) => {
        defaultQueryOnSuccess(result.data.content);
      })
      .catch(() => {
        defaultQueryOnSuccess([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormControl fullWidth sx={sx}>
      <Autocomplete
        value={registerProp.value}
        isOptionEqualToValue={(option: any, value) => {
          return value === "" || value === 0 || option.id === value.id;
        }}
        getOptionLabel={(item) => {
          const str = options.list.find((p) => p?.id?.toString() === item?.id?.toString())?.label;
          if (str) return str;
          return "";
        }}
        size={size}
        // sx={{ width: 300 }}
        options={options.list}
        loading={options.isFetching}
        onChange={(_, value) => {
          registerProp.onChange(value);
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            {option.label}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
