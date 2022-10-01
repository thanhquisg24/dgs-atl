import { useGetList } from "@hooks/useGetList";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { get } from "lodash";

interface IProps {
  id: string;
  label?: string;
  size: "small" | "medium" | undefined;
  errorMsg?: string | any;
  sx?: any;
  registerProp?: any;
  idField: string;
  textField: string;
  displayIdAndText?: boolean;
  queryStr: string;
}

export default function AsynCustomSelectV3(props: IProps) {
  const { id, label, size, errorMsg, sx, registerProp, idField, textField, displayIdAndText, queryStr } = props;
  const listData = useGetList(queryStr);
  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select label={label} labelId={id} size={size} {...registerProp}>
        <MenuItem value=""></MenuItem>
        {listData.data.map((item) => (
          <MenuItem value={get(item, idField)} key={get(item, idField)}>
            {displayIdAndText ? `${get(item, idField)} - ${get(item, textField)}` : get(item, textField)}
          </MenuItem>
        ))}
      </Select>
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
