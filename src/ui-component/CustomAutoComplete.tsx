import { useSelect } from "@hooks/useSelect";
import { TextField, Autocomplete, CircularProgress, FormControl, FormHelperText } from "@mui/material";
import React from "react";

const errorMsg = "this field is required";
const query = JSON.stringify({
  resource: "dgs-league",
  perPage: 50,
  filter: { idSport: "NFL" },
  sort: { field: "description", order: "ASC" },
});
export default function CustomAutoComplete() {
  const { options, onSearch } = useSelect({
    queryStr: query,
    debounce: 500,
    optionLabel: "description",
    optionValue: "idLeague",
  });
  const loading = options.isFetching;

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <Autocomplete
        id="asynchronous-demo"
        // sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.id === value}
        getOptionLabel={(option) => `${option.label}`}
        options={options.list}
        loading={loading}
        onInputChange={(event, newInputValue) => {
          if (onSearch) {
            onSearch(newInputValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </FormControl>
  );
}
