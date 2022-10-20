import { IDgsLineTypeEntity, IDonbestSportBookEntity } from "@adapters/entity";
import { FormControl, FormHelperText, Grid, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function GameSportbookSelect(props: {
  listLineType: IDgsLineTypeEntity[];
  listSportBook: IDonbestSportBookEntity[];
}) {
  const { listLineType, listSportBook } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
              min: {
                value: 1,
                message: "This Field is Required",
              },
            }}
            render={({ field }) => (
              <>
                <Select {...field} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
                  <MenuItem value={0}>Select linetype...</MenuItem>
                  {listLineType.map((item) => (
                    <MenuItem key={item.idLineType} value={item.idLineType}>
                      {item.description}
                    </MenuItem>
                  ))}
                </Select>
                {errors.lineTypeId && <FormHelperText error>{errors.lineTypeId?.message}</FormHelperText>}
              </>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item md={3}>
        <Controller
          name="dbSportsBookId"
          control={control}
          rules={{
            required: "This Field is Required",
          }}
          render={({ field }) => (
            <Select {...field} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth size="small">
              <MenuItem value={0}>Select book ...</MenuItem>
              {listSportBook.map((item) => (
                <MenuItem key={item.idSportsbook} value={item.idSportsbook}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Grid>
    </Grid>
  );
}
