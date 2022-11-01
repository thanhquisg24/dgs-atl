import { IDgsGameEntityWithLeague, IDgsLineTypeEntity, IDonbestSportBookEntity } from "@adapters/entity";
import { FormControl, FormHelperText, Grid, MenuItem, Select, Typography } from "@mui/material";
import { IMapFilterPeriodConfig } from "@store/models/feed-model";
import { formatToUsDateStr } from "@utils/date-format";
import { checkExistsItemIntree } from "@utils/index";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function CustomTextInSelectBoxGame(props: { text: string; tree: IMapFilterPeriodConfig | null; itemKey: string | number }) {
  const { text, tree, itemKey } = props;
  const classColor = React.useMemo(() => {
    const isExist = checkExistsItemIntree(tree, itemKey);
    if (isExist) {
      return "color-active";
    }
    return "color-default";
  }, [itemKey, tree]);
  return <span className={classColor}>{text}</span>;
}
export default function GameSportbookSelect(props: {
  gameWithLeague: IDgsGameEntityWithLeague;
  listLineType: IDgsLineTypeEntity[];
  listSportBook: IDonbestSportBookEntity[];
  mapFilterPeriodConfig: IMapFilterPeriodConfig | null;
}) {
  const { listLineType, listSportBook, mapFilterPeriodConfig, gameWithLeague } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={1}>
      <Grid item md={4}>
        <Typography variant="h6">{formatToUsDateStr(gameWithLeague.gameDateTime)}</Typography>
      </Grid>
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
                      <CustomTextInSelectBoxGame text={item.description} tree={mapFilterPeriodConfig} itemKey={item.idLineType} />
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
