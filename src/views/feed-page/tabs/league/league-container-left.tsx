import { IDgsLineTypeEntity, IDonbestSportBookEntity } from "@adapters/entity";
import { useAppDispatch } from "@hooks/useReduxToolKit";
import { Box, Checkbox, FormControlLabel, FormHelperText, Grid, MenuItem, Select, Typography } from "@mui/material";
import { selectLeagueIdRequest } from "@store/actions";
import { ILeagueInfoModel, IMapFilterLineTypeConfig } from "@store/models/feed-model";
import { checkExistsItemIntree } from "@utils/index";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { LeagueOddsRow } from "./league-odds-row";

interface IProps {
  leagueInfoList: ILeagueInfoModel[];
  listLineType: IDgsLineTypeEntity[];
  listSportBook: IDonbestSportBookEntity[];
  savedLineTypeConfig: IMapFilterLineTypeConfig | null;
}
function CustomTextInSelectBox(props: {
  text: string;
  tree: IMapFilterLineTypeConfig | null;
  itemKey: string | number;
}) {
  const { text, tree, itemKey } = props;
  const classColor = React.useMemo(() => {
    const isExist = checkExistsItemIntree(tree, itemKey);
    if (isExist && tree) {
      return tree[itemKey].enabled ? "color-active" : "color-disabled";
    }
    return "color-default";
  }, [itemKey, tree]);
  return <span className={classColor}>{text}</span>;
}
function SportBookSelect(props: IProps) {
  const { leagueInfoList, listLineType, listSportBook, savedLineTypeConfig } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();
  const onChangeSelectLeague = (e: any) => {
    const { value } = e.target;
    dispatch(selectLeagueIdRequest({ dgsLeagueId: value }));
  };
  return (
    <Grid container spacing={1}>
      <Grid item md={5}>
        <Controller
          name="dgsLeagueId"
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
              <Select
                {...field}
                onChange={(e) => onChangeSelectLeague(e)}
                inputProps={{ "aria-label": "Without label" }}
                fullWidth
              >
                <MenuItem value={-1}>Select league...</MenuItem>
                {leagueInfoList.map((item) => (
                  <MenuItem key={item.dgsLeague.idLeague} value={item.dgsLeague.idLeague}>
                    {item.dgsLeague.description}
                  </MenuItem>
                ))}
              </Select>
              {errors.dgsLeagueId && <FormHelperText error>{errors.dgsLeagueId?.message}</FormHelperText>}
            </>
          )}
        />
      </Grid>
      <Grid item md={4}>
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
                    <CustomTextInSelectBox
                      text={item.description}
                      tree={savedLineTypeConfig}
                      itemKey={item.idLineType}
                    />
                  </MenuItem>
                ))}
              </Select>
              {errors.lineTypeId && <FormHelperText error>{errors.lineTypeId?.message}</FormHelperText>}
            </>
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
      <Grid item md={4}></Grid>
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
  const { leagueInfoList, listLineType, listSportBook, savedLineTypeConfig } = props;
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "periodConfig",
  });
  return (
    <Box sx={{ width: "100%" }}>
      <SportBookSelect
        leagueInfoList={leagueInfoList}
        listLineType={listLineType}
        listSportBook={listSportBook}
        savedLineTypeConfig={savedLineTypeConfig}
      />
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
