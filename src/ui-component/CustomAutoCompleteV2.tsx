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
  React.useEffect(() => {
    console.log("🚀 ~ file: CustomAutoCompleteV2.tsx ~ line 37 ~ React.useEffect ~ re render");
  }, []);
  return (
    <FormControl fullWidth sx={sx}>
      <Autocomplete
        {...registerProp}
        isOptionEqualToValue={(option: any, value) => value === "" || option.id === value.id}
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
          console.log(
            "🚀 ~ file: CustomAutoCompleteV2.tsx ~ line 43 ~ CustomAutoCompleteV2 ~ newInputValue",
            newInputValue,
          );
          if (onSearch) {
            onSearch(newInputValue);
          }
        }}
        onChange={(_, value) => {
          console.log("🚀 ~ file: CustomAutoCompleteV2.tsx ~ line 48 ~ CustomAutoCompleteV2 ~ value", value);
          registerProp.onChange(value);
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
