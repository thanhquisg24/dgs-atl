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
  initSport?: ISportMapping;
}

export default function DgsSportMappingSelectbox(props: IProps) {
  const { id, label, size, errorMsg, sx, registerProp, displayIdAndText, dbSportId, initSport } = props;
  const [state, setState] = React.useState<{
    list: ISportMapping[];
    listFiltered: ISportMapping[];
    isFetching: boolean;
    count: number;
  }>({
    list: [],
    listFiltered: initSport ? [initSport] : [],
    isFetching: true,
    count: 0,
  });

  React.useEffect(() => {
    setState({ list: [], isFetching: true, listFiltered: [], count: 0 });
    diRepositorires.sportMapping
      .fetAllDonbestSportMapping()
      .then((result: ISportMapping[]) => setState({ list: result, listFiltered: result, isFetching: false, count: 0 }))
      .catch(() => setState({ list: [], isFetching: false, listFiltered: [], count: 0 }));
  }, []);

  React.useEffect(() => {
    if (dbSportId) {
      const arr = state.list.filter((x) => x.dbSportId === Number(dbSportId));
      // registerProp.onChange("");
      if (arr) {
        if (state.count > 1) {
          registerProp.onChange("");
        }
        setState({ ...state, listFiltered: arr, count: state.count + 1 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.list, dbSportId]);

  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel id={id}>{label}</InputLabel>
      {state.isFetching === false && (
        <Select label={label} labelId={id} size={size} {...registerProp} InputLabelProps={{ shrink: true }}>
          <MenuItem value=""></MenuItem>
          {state.listFiltered.map((item) => (
            <MenuItem value={item.dgsSportId} key={item.id}>
              {displayIdAndText ? `${item.dgsSportId} - ${item.dgsSportName}` : item.dgsSportName}
            </MenuItem>
          ))}
        </Select>
      )}
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
