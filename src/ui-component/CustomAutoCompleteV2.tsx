/* eslint-disable react/jsx-curly-newline */
import { useSelect } from "@hooks/useSelect";
import { Autocomplete, FormControl, FormHelperText, TextField } from "@mui/material";
import React from "react";

interface IProps {
  id: string;
  label?: string;
  size: "small" | "medium" | undefined;
  errorMsg?: string | any;
  sx?: any;
  registerProp?: any;
  idField: string;
  textField: string;
  queryStr: string;
  dependencyField?: string;
}
export default function CustomAutoCompleteV2(props: IProps) {
  const { label, size, errorMsg, sx, idField, textField, queryStr, registerProp, dependencyField } = props;

  const { options, onSearch } = useSelect({
    queryStr,
    debounce: 1200,
    optionValue: idField,
    optionLabel: textField,
    dependencyField,
  });
  const loading = options.isFetching;

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
          if (onSearch) {
            onSearch("");
          }
          return "";
        }}
        size={size}
        // sx={{ width: 300 }}
        options={options.list}
        loading={loading}
        onInputChange={(event, newInputValue) => {
          if (onSearch) {
            onSearch(newInputValue);
          }
        }}
        onChange={(_, value) => {
          registerProp.onChange(value);
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
