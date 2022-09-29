import { useGetList } from "@hooks/useGetList";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { get } from "lodash";
import React from "react";
import { IQueryParams } from "../types/query-type";

interface IData {
  value: string | number;
  text: string;
}

interface IProps {
  id: string;
  label?: string;
  size: "small" | "medium" | undefined;
  errorMsg?: string | any;
  sx?: any;
  registerProp?: any;
  idField: string;
  textField: string;
  listData: any[];
  displayIdAndText?: boolean;
}

export default function AsynCustomSelectV2(props: IProps) {
  const { id, label, size, errorMsg, sx, registerProp, idField, textField, listData, displayIdAndText } = props;

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select label={label} labelId={id} size={size} {...registerProp}>
        <MenuItem value=""></MenuItem>
        {listData.map((item) => (
          <MenuItem value={get(item, idField)} key={get(item, idField)}>
            {displayIdAndText ? `${get(item, idField)} - ${get(item, textField)}` : get(item, textField)}
          </MenuItem>
        ))}
      </Select>
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
