import { ISportMapping } from "@adapters/entity";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { diRepositorires } from "../../adapters/di/index";

interface IProps {
  id: string;
  label?: string;
  size: "small" | "medium" | undefined;
  errorMsg?: string | any;
  sx?: any;
  registerProp?: any;
  dbSportId: number | string | null;
  displayIdAndText?: boolean;
}

export default function DgsSportMappingSelectbox(props: IProps) {
  const { id, label, size, errorMsg, sx, registerProp, displayIdAndText, dbSportId } = props;
  const [state, setState] = React.useState<{
    list: ISportMapping[];
    isFetching: boolean;
  }>({
    list: [],
    isFetching: false,
  });
  const [listFiltered, setListFiltered] = React.useState<ISportMapping[]>([]);

  React.useEffect(() => {
    setState({ list: [], isFetching: true });
    diRepositorires.sportMapping
      .fetAllDonbestSportMapping()
      .then((result: ISportMapping[]) => setState({ list: result, isFetching: false }))
      .catch(() => setState({ list: [], isFetching: false }));
  }, []);

  React.useEffect(() => {
    const arr = state.list.filter((x) => x.dbSportId === Number(dbSportId));
    registerProp.onChange("");
    setListFiltered(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.list, dbSportId]);

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select label={label} labelId={id} size={size} {...registerProp} InputLabelProps={{ shrink: true }}>
        <MenuItem value=""></MenuItem>
        {listFiltered.map((item) => (
          <MenuItem value={item.dgsSportId} key={item.id}>
            {displayIdAndText ? `${item.dgsSportId} - ${item.dgsSportName}` : item.dgsSportName}
          </MenuItem>
        ))}
      </Select>
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
