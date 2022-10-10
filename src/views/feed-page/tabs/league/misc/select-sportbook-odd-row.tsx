import { IDonbestSportBookEntity } from "@adapters/entity";
import { MenuItem, Select } from "@mui/material";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

export default function SelectSportbookOdd(props: {
  control: Control<FieldValues, any>;
  listSportBook: IDonbestSportBookEntity[];
  name: string;
}) {
  const { control, listSportBook, name } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "This Field is Required",
      }}
      render={({ field }) => (
        <Select {...field} size="small" displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={0}>Select...</MenuItem>
          {listSportBook.map((item) => (
            <MenuItem key={item.idSportsbook} value={item.idSportsbook}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
}
