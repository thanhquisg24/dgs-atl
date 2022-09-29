// material-ui
import { Box, Typography, Grid, FormControl, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { Controller, useForm } from "react-hook-form";
// project imports
import MainCard from "@ui-component/cards/MainCard";
import BasicTable from "./preview-table";
import React from "react";
import { useGetList } from "@hooks/useGetList";
import AsynCustomSelectV2 from "@ui-component/AsynCustomSelectV2";
import CustomSelect from "@ui-component/CustomSelect";
import CustomAutoComplete from "@ui-component/CustomAutoComplete";

// ==============================|| SAMPLE PAGE ||============================== //
const Title = () => (
  <Grid container spacing={gridSpacing}>
    <Grid item md={4}>
      <Typography variant="h3" gutterBottom align="center" component="span">
        DonBest
      </Typography>
    </Grid>
    <Grid item md={4}>
      <Typography variant="h3" gutterBottom align="center" component="span">
        DGS
      </Typography>
    </Grid>
  </Grid>
);

export interface IRowsLeagueMapping {
  rows: {
    dbSportId: number;
    dbSportName: string;
    dbLeagueId: number;
    dbLeagueName: string;
    dgsSportId: string;
    dgsSportName: string;
    dgsLeagueId: number;
    dgsLeagueName: string;
  }[];
}

const defaultValues = {
  dbSportId: "",
  dgsSportId: "",
};
const AddLeagueMapping = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const [state, setState] = React.useState<IRowsLeagueMapping>({
    rows: [],
  });

  // const getListDgsSport = useGetList(
  //   JSON.stringify({
  //     resource: "dgs-sports",
  //     perPage: 50,
  //     sort: { field: "sportOrder", order: "ASC" },
  //   }),
  // );

  const onSubmit = (data: any) => {
    const row = {
      dbSportId: 1,
      dbSportName: "NFL",
      dbLeagueId: 22,
      dbLeagueName: "BITCOIN",
      dgsSportId: "33",
      dgsSportName: "ETH",
      dgsLeagueId: 44,
      dgsLeagueName: "BNB",
    };
    setState({ rows: [...state.rows, row] });
  };
  const onDeleteRow = (index: number) => {
    const rows = [...state.rows];
    rows.splice(index, 1);
    setState({ rows });
  };

  return (
    <MainCard title="Add league  mapping">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "100%" }}>
          <Title></Title>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={4}>
              <Controller
                name="dbSportId"
                control={control}
                rules={{
                  required: "This Field is Required",
                }}
                render={({ field }) => (
                  <CustomSelect
                    id="db-sport-select"
                    label="DonBest Sport"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dbSportId?.message}
                  ></CustomSelect>
                )}
              />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="db-sport-select2">DonBest Sport</InputLabel>
                <Select label="DonBest Sport" labelId="db-sport-select2" size="small" value={10}>
                  <MenuItem value={10}>ten20</MenuItem>
                  <MenuItem value={20}>Twenty 20</MenuItem>
                  <MenuItem value={30}>Thirty20</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={4}>
              {/* <Controller
                name="dgsSportId"
                control={control}
                rules={{
                  required: "This Field is Required",
                }}
                render={({ field }) => (
                  <AsynCustomSelectV2
                    id="dgs-sport-select"
                    label="DGS Sport"
                    size="small"
                    registerProp={field}
                    errorMsg={errors.dbSportId?.message}
                    idField="idSport"
                    textField="sportName"
                    listData={getListDgsSport.data}
                    displayIdAndText
                  ></AsynCustomSelectV2>
                )}
              /> */}

              <CustomAutoComplete />
            </Grid>
            <Grid item md={4}>
              <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }} type="submit">
                Add item
              </Button>
            </Grid>
          </Grid>
          <Grid spacing={gridSpacing} container sx={{ mt: 2 }}>
            <Grid item md={8}>
              <Typography variant="h3" gutterBottom align="center" component="span">
                Preview mapping table
              </Typography>
              <BasicTable rows={state.rows} onDeleteRow={onDeleteRow} />
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 3.5 }}>
            <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
              Save
            </Button>
          </Grid>
        </Box>
      </form>
    </MainCard>
  );
};

export default AddLeagueMapping;
