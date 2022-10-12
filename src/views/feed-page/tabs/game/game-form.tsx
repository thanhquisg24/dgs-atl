import { FilterTypeEnum, IDgsGameEntityWithLeague, IFilterPeriodEntity } from "@adapters/entity";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { Button, Grid, Typography } from "@mui/material";
import { gridSpacing } from "@store/constant";
import { getFeedLoading, getListLineType, getListSportBook, getSelectedGame } from "@store/selector";
import { RootStateType } from "@store/types";
import { FormProvider, useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { GameOddsRow } from "./game-odds-row";
import GameSportbookSelect from "./game-sportbook-select";

interface IProps {
  gameSelected: IDgsGameEntityWithLeague;
}

type IGameFromValue = IFilterPeriodEntity;
const defaultValues: IGameFromValue = {
  dgsLeagueId: -1,
  type: FilterTypeEnum.EVENT,
  lineTypeId: 0,
  id: null,
  dgsGameId: 0,
  period: 0,
  enabled: false,
  ps: false,
  ml: false,
  total: false,
  team_total: false,
  way3: false,
  dbSportBookId: 0,
  ps_point: 0,
  ps_juice: 0,
  ml_point: 0,
  ml_juice: 0,
  total_point: 0,
  total_juice: 0,
  team_total_point: 0,
  team_total_juice: 0,
  way3_point: 0,
  way3_juice: 0,
  dbGameId: 0,
  dbLeagueId: 0,
};

function GameFromBody(props: IProps) {
  const { gameSelected } = props;
  const isLoading = useAppSelector(getFeedLoading);
  const [listLineType, listSportBook] = useAppSelector(
    (reduxState: RootStateType) => [getListLineType(reduxState), getListSportBook(reduxState)],
    shallowEqual,
  );
  const hookForm = useForm({ defaultValues });
  return (
    <fieldset>
      <legend>
        Settings: {gameSelected.homeTeam} vs {gameSelected.visitorTeam}{" "}
      </legend>
      <FormProvider {...hookForm}>
        <Grid spacing={gridSpacing} container>
          <Grid item md={8}>
            <GameSportbookSelect listLineType={listLineType} />
            <GameOddsRow listSportBook={listSportBook} />
            <Typography variant="h6" color="secondary" sx={{ mt: 3.5 }}>
              This event uses the league setting
            </Typography>
            {/* <Grid item md={12} sx={{ mt: 3.5, mb: 3.5 }}>
          </Grid> */}
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end" sx={{ mt: 3.5 }}>
          <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
            Sync Odds
          </Button>
          <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
            Use Default
          </Button>
          <Button variant="contained" sx={{ flex: 1, ml: 1, maxWidth: "110px" }}>
            Apply
          </Button>
        </Grid>
      </FormProvider>
    </fieldset>
  );
}

function GameFormWithLoading(props: { gameSelected: IDgsGameEntityWithLeague }) {
  const { gameSelected } = props;
  const isLoading = useAppSelector(getFeedLoading);
  return isLoading ? <b>Loading....!</b> : <GameFromBody gameSelected={gameSelected} />;
}

export function GameForm() {
  const gameSelected: IDgsGameEntityWithLeague | null = useAppSelector(getSelectedGame);
  return gameSelected !== null ? <GameFormWithLoading gameSelected={gameSelected} /> : <b>Please Select game!</b>;
}
