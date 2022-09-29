import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface IProps {
  id: string;
  label?: string;
  size: "small" | "medium" | undefined;
  errorMsg?: string | any;
  sx?: any;
  registerProp?: any;
}

export default function CustomSelect(props: IProps) {
  const { id, label, size, errorMsg, sx, registerProp } = props;
  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select label={label} labelId={id} size={size} {...registerProp}>
        <MenuItem value=""></MenuItem>
        <MenuItem value={10}>ten20</MenuItem>
        <MenuItem value={20}>Twenty 20</MenuItem>
        <MenuItem value={30}>Thirty20</MenuItem>
      </Select>
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
