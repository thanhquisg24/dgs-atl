import { IDgsLineTypeEntity, IFilterPeriodEntity } from "@adapters/entity";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function GameSportbookSelect(props: {
  listLineType: IDgsLineTypeEntity[];
  eventFilterPeriodConfig: IFilterPeriodEntity[];
}) {
  const { listLineType, eventFilterPeriodConfig } = props;
  const { control } = useFormContext();
  return (
    <Grid container spacing={1}>
      <Grid item md={4}></Grid>
      <Grid item md={5}>
        <FormControl size="small" fullWidth>
          <Controller
            name="lineTypeId"
            control={control}
            rules={{
              required: "This Field is Required",
            }}
            render={({ field }) => (
              <Select {...field} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
                <MenuItem value={0}>Select linetype...</MenuItem>
                {listLineType.map((item) => (
                  <MenuItem key={item.idLineType} value={item.idLineType}>
                    {eventFilterPeriodConfig.length > 0 && eventFilterPeriodConfig[0].lineTypeId === item.idLineType ? (
                      <b>{item.description}</b>
                    ) : (
                      item.description
                    )}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
