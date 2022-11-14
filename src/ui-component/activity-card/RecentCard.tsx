import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PropTypes from "prop-types";
// material-ui
import { Avatar, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { gridSpacing } from "@store/constant";
import MainCard from "@ui-component/cards/MainCard";
import SkeletonPopularCard from "@ui-component/cards/Skeleton/PopularCard";
import { Queue } from "@utils/queue";
import { isEmpty, omit } from "lodash";
import React from "react";

// assets

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const ActivityRow = ({ theme, idGame, onHandleRemoveItem }: any) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onHandleRemoveItem(idGame);
    }, 1500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                Updating game values for game
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="subtitle1" color="inherit">
                    #{idGame}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "5px",
                      backgroundColor: theme.palette.success.light,
                      color: theme.palette.success.dark,
                      ml: 2,
                    }}
                  >
                    <PlayCircleOutlineIcon fontSize="small" color="inherit" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 1.5 }} />
    </>
  );
};

const REFRESH_INTERVAL = 1000 * 3;

const RecentCard = (props: { isLoading: boolean; idGames: number[]; displayNoMsg?: boolean }) => {
  const { isLoading, idGames, displayNoMsg = false } = props;
  const [state, setState] = React.useState<{ [idgame: number]: number }>({});
  const theme: any = useTheme();
  const q = React.useMemo(() => {
    return new Queue<number[]>();
  }, []);

  React.useEffect(() => {
    q.enqueue(idGames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idGames]);
  React.useEffect(() => {
    let intaval: null | any = null;
    intaval = setInterval(() => {
      // eslint-disable-next-line no-shadow
      const { size } = q;
      if (size > 0) {
        // eslint-disable-next-line no-nested-ternary
        // const len = size >= 20 ? 20 : size >= 10 ? 10 : 1;
        const len = size;
        let obj = {};
        for (let index = 0; index < len; index++) {
          const element = q.dequeue();
          const oitem = element.reduce((store: any, cur) => {
            return { ...store, [cur]: cur };
          }, {}); //end reduce
          obj = { ...obj, ...oitem };
        }
        if (isEmpty(obj) === false) setState({ ...state, ...obj });
      } else {
        setState({});
      }
    }, REFRESH_INTERVAL);
    return () => {
      if (intaval !== null) {
        clearInterval(intaval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleRemoveItem = React.useCallback(
    (idgame: number) => {
      const newState = omit(state, idgame);
      setState(newState);
    },
    [state],
  );
  // const gamesRender: number[] | undefined = React.useMemo(() => {
  //   return peek();
  // }, [peek]);
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Updating Activity</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {Object.values(state).map((item) => (
                  <ActivityRow key={item} theme={theme} idGame={item} onHandleRemoveItem={onHandleRemoveItem} />
                ))}
                {isEmpty(state) && displayNoMsg && (
                  <Grid container direction="column">
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            No Activity!
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions> */}
        </MainCard>
      )}
    </>
  );
};

RecentCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default RecentCard;
