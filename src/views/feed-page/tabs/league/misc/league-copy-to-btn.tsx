import { useAppDispatch } from "@hooks/useReduxToolKit";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText } from "@mui/material";
import { taskChannelRequestAction } from "@store/actions";
import { Copy_to_league_Task_Type, TASK_TYPE } from "@store/feed-task-queue/FeedTaskQueueModel";

import { ILeagueInfoModel } from "@store/models/feed-model";
import { has, isEmpty, omit } from "lodash";
import React from "react";
import { useFormContext } from "react-hook-form";
import { buildPayloadCopyToLeague } from "./league-help";

interface IState {
  selection: { [dgsLeagueId: number]: ILeagueInfoModel };
  errorMsg: string;
}
export default function LeagueCopyToBtn(props: { leagueInfoList: ILeagueInfoModel[]; dgsSportId: string | null }) {
  const { leagueInfoList, dgsSportId } = props;
  const leagueInfoListFilter = React.useMemo(() => {
    if (dgsSportId) {
      return leagueInfoList.filter((e) => e.dgsLeague.idSport === dgsSportId);
    }
    return [];
  }, [dgsSportId, leagueInfoList]);

  const dispatch = useAppDispatch();
  const hookForm = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<IState>({ selection: {}, errorMsg: "" });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (isEmpty(state.selection)) {
      setState({ ...state, errorMsg: "Please select league!" });
    } else {
      const data = hookForm.getValues();
      //@ts-ignore
      const payload = buildPayloadCopyToLeague(data, state.selection);

      const channelPayload: Copy_to_league_Task_Type = {
        taskObject: "Copy to leagues",
        taskType: TASK_TYPE.COPY_TO_LEAGUE,
        payload,
      };
      dispatch(taskChannelRequestAction(channelPayload));
      // emitStartLoading();
      // diRepositorires.donbestFilter
      //   .postCopyLeagueFilters(payload)
      //   .then(() => {
      //     emitStopLoading();
      //     dispatch(
      //       selectLeagueIdRefresh({
      //         dgsLeagueId: data.dgsLeagueId,
      //         defaultSelectedLineType: `${data.lineTypeId}`,
      //       }),
      //     );
      //     setOpen(false);
      //     notifyMessageSuccess("Copy to leagues success!");
      //   })
      //   .catch(() => {
      //     notifyMessageError("Copy failure! please try again.");
      //     emitStopLoading();
      //   });
    }
    // setOpen(false);
  };
  const copyToLeague = () => {
    hookForm.trigger().then((result: boolean) => {
      if (result) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    });
  };

  const handleChange = (item: ILeagueInfoModel) => {
    let tmpSeletion = { ...state.selection };
    if (has(state.selection, item.dgsLeague.idLeague)) {
      const editSelection = omit({ ...state.selection }, [item.dgsLeague.idLeague]);
      tmpSeletion = editSelection;
    } else {
      const addedItem = { [item.dgsLeague.idLeague]: item };
      tmpSeletion = { ...state.selection, ...addedItem };
    }
    const errorMsg = isEmpty(tmpSeletion) ? "Please select league!" : "";
    setState({ errorMsg, selection: tmpSeletion });
  };

  return (
    <>
      <Button variant="contained" sx={{ flex: 1, mt: 2 }} fullWidth onClick={() => copyToLeague()}>
        Copy to Leagues
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Copy to Leagues</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
              <FormGroup>
                {leagueInfoListFilter.map((item) => (
                  <React.Fragment key={item.dgsLeague.idLeague}>
                    {item.dgsLeague.idSport.trim() !== "NHL" && (
                      <FormControlLabel
                        control={<Checkbox checked={has(state.selection, item.dgsLeague.idLeague)} onChange={() => handleChange(item)} name="dgsLeague_checkbox" />}
                        label={item.dgsLeague.description}
                      />
                    )}
                  </React.Fragment>
                ))}
              </FormGroup>
              <FormHelperText error>{state.errorMsg}</FormHelperText>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
