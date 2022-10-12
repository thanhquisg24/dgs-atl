import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Select, Typography } from "@mui/material";
import { ILeagueInfoModel } from "@store/models/feed-model";
import { LeagueOddTitle } from "./league-odd-title";
import { LeagueOddsRow } from "./league-odds-row";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { IDgsLineTypeEntity, IDonbestSportBookEntity } from "@adapters/entity";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { getSelectedLeague } from "@store/selector";

interface IProps {
  leagueInfoList: ILeagueInfoModel[];
  listLineType: IDgsLineTypeEntity[];
  listSportBook: IDonbestSportBookEntity[];
}

function SportBookSelect(props: IProps) {
  const { leagueInfoList, listLineType, listSportBook } = props;
  const { control } = useFormContext();

  return (
    <Grid container spacing={1}>
      <Grid item md={5}>
        <Controller
          name="dgsLeagueId"
          control={control}
          rules={{
            required: "This Field is Required",
          }}
          render={({ field }) => (
            <Select {...field} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
              <MenuItem value={-1}>Select...</MenuItem>
              {leagueInfoList.map((item) => (
                <MenuItem key={item.dgsLeague.idLeague} value={item.dgsLeague.idLeague}>
                  {item.dgsLeague.description}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Grid>
      <Grid item md={4}>
        <Controller
          name="lineTypeId"
          control={control}
          rules={{
            required: "This Field is Required",
          }}
          render={({ field }) => (
            <Select {...field} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
              <MenuItem value={0}>Select...</MenuItem>
              {listLineType.map((item) => (
                <MenuItem key={item.idLineType} value={item.idLineType}>
                  {item.description}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Grid>
      <Grid item md={3}>
        <Controller
          name="dbSportsBookId"
          control={control}
          rules={{
            required: "This Field is Required",
          }}
          render={({ field }) => (
            <Select {...field} displayEmpty inputProps={{ "aria-label": "Without label" }} fullWidth>
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

      <Grid item md={5}>
        <Typography variant="h6" color="secondary" sx={{ lineHeight: "3em" }}>
          Linked From: None
        </Typography>
      </Grid>
      <Grid item md={4}>
        <Controller
          name="followParentExcept"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value}
                  size="small"
                  disabled
                />
              }
              label="Follow Except"
            />
          )}
        />
      </Grid>
      <Grid item md={3}>
        <Controller
          name="enabled"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
              }
              label="Active"
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

export default function LeagueContainerLeft(props: IProps) {
  const { leagueInfoList, listLineType, listSportBook } = props;
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "periodConfig",
  });
  return (
    <Box sx={{ width: "100%" }}>
      <SportBookSelect leagueInfoList={leagueInfoList} listLineType={listLineType} listSportBook={listSportBook} />
      {/* <LeagueOddTitle /> */}
      {fields.map((item, index) => (
        <LeagueOddsRow
          key={item.id}
          indexField={index}
          control={control}
          listSportBook={listSportBook}
          //@ts-ignore
          periodCodeNumber={item.period}
        />
      ))}
    </Box>
  );
}
