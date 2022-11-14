import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PropTypes from "prop-types";
// material-ui
import { Avatar, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { gridSpacing } from "@store/constant";
import MainCard from "@ui-component/cards/MainCard";
import SkeletonPopularCard from "@ui-component/cards/Skeleton/PopularCard";

// assets

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const ActivityRow = ({ theme, idGame }: any) => {
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

// const REFRESH_INTERVAL = 1000 * 5;
const RecentCard = (props: { isLoading: boolean; idGames: number[] }) => {
  const { isLoading, idGames } = props;
  // const [state, setState] = React.useState<number[]>([]);
  const theme: any = useTheme();

  // useEffect(() => {
  //   console.log("🚀 ~ file: RecentCard.tsx ~ line 70 ~ useEffect ~ idGames", idGames);
  //   const s = new Set(state);
  //   for (let index = 0; index < idGames.length; index++) {
  //     const element = idGames[index];
  //     s.add(element);
  //   }
  //   setState([...s]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [idGames]);
  // useEffect(() => {
  //   let intaval: null | any = null;
  //   intaval = setInterval(() => {
  //     // eslint-disable-next-line no-shadow
  //     console.log("🚀 ~ file: RecentCard.tsx ~ line 82 ~ intaval=setInterval ~ state");
  //     setState((state) => {
  //       return state.splice(0, 1);
  //     });
  //     // dequeue();
  //     // const i = peek();
  //   }, REFRESH_INTERVAL);
  //   return () => {
  //     if (intaval !== null) {
  //       clearInterval(intaval);
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
                {idGames.map((item) => (
                  <ActivityRow key={item} theme={theme} idGame={item} />
                ))}
                {idGames.length === 0 && (
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
