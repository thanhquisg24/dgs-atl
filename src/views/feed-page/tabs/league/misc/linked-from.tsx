import { diRepositorires } from "@adapters/di";
import { ILineTypeLinkEntity } from "@adapters/entity";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { Box, CircularProgress, Paper, Stack, styled } from "@mui/material";
import { getDgsSportIdFromSelectedLeague } from "@store/selector";
import React from "react";
import { useFormContext } from "react-hook-form";

// const textColor = {
//   color: "#673ab7",
//   fontWeight: "bold",
// };
interface IState {
  listData: ILineTypeLinkEntity[];
  isFetching: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.h5,
  padding: theme.spacing(1),
  //   fontWeight: "bold",
  textAlign: "center",
  color: "#5e35b1",
}));
const ItemTitle = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.h5,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));
export default function LinkedFrom() {
  const dgsSportId: string | null = useAppSelector(getDgsSportIdFromSelectedLeague);
  const { watch } = useFormContext();
  const watchLineTypeId = watch("lineTypeId");
  const [state, setState] = React.useState<IState>({
    listData: [],
    isFetching: false,
  });
  React.useEffect(() => {
    if (dgsSportId !== null && watchLineTypeId > 0) {
      setState({
        listData: [],
        isFetching: true,
      });
      diRepositorires.dgsLineTypeLink
        .fetchLineTypeLinks(watchLineTypeId, dgsSportId)
        .then((result) => {
          setState({
            listData: result,
            isFetching: false,
          });
        })
        .catch(() => {
          setState({
            listData: [],
            isFetching: false,
          });
        });
    }
  }, [watchLineTypeId, dgsSportId]);
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
        <ItemTitle>Linked From:</ItemTitle>
        {state.isFetching && <CircularProgress color="secondary" size={20} />}
        {state.listData.map((item) => (
          <Item key={item.idLineTypeIn}>{item.inDescription}</Item>
        ))}
        {state.listData.length === 0 && state.isFetching === false && <Item>None</Item>}
      </Stack>

      {/* <List component={Stack} direction="row" justifyContent="flex-start" spacing={2}>
        <ListItem disablePadding>
          <ListItemText primary="Linked From: " />
        </ListItem>
        {state.isFetching && (
          <ListItem disablePadding>
            <CircularProgress color="secondary" size={20} />
          </ListItem>
        )}
        {state.listData.map((item) => (
          <ListItem disablePadding key={item.idLineTypeIn}>
            <ListItemText primaryTypographyProps={{ style: textColor }} primary={item.inDescription} />
          </ListItem>
        ))}
        {state.listData.length === 0 && state.isFetching === false && (
          <ListItem disablePadding>
            <ListItemText primaryTypographyProps={{ style: textColor }} primary="None" />
          </ListItem>
        )}
      </List> */}
    </Box>
  );
}
