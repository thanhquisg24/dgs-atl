import { IDonbestSportBookEntity } from "@adapters/entity";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

export default function SelectSportbookOdd(props: {
  control: Control<FieldValues, any>;
  listSportBook: IDonbestSportBookEntity[];
  name: string;
  errorMsg?: string | any;
}) {
  const { control, listSportBook, name, errorMsg } = props;
  return (
    <Controller
      name={name}
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
          <Select {...field} size="small" displayEmpty inputProps={{ "aria-label": "Without label" }}>
            <MenuItem value={0}>Select book...</MenuItem>
            {listSportBook.map((item) => (
              <MenuItem key={item.idSportsbook} value={item.idSportsbook}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
        </>
      )}
    />
  );
}
