import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { green, red, orange } from "@mui/material/colors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { getNotifyTaskMessagesSelector } from "@store/selector";
import { ITaskMessageItem } from "@store/models/notify-task-model";

const StatusMap = {
  START: (
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: orange[500], color: "white" }}>
        <AccessTimeIcon />
      </Avatar>
    </ListItemAvatar>
  ),
  SUCCESS: (
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: green[500], color: "white" }}>
        <CheckCircleOutlineIcon />
      </Avatar>
    </ListItemAvatar>
  ),
  FAIL: (
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: red[500], color: "white" }}>
        <ErrorOutlineIcon />
      </Avatar>
    </ListItemAvatar>
  ),
};

function TaskItem(props: { message: ITaskMessageItem; isDivider: boolean }) {
  const { message, isDivider } = props;
  return (
    <ListItem divider={isDivider}>
      {StatusMap[message.status]}
      <ListItemText primary={message.text} secondary={message.time} />
    </ListItem>
  );
}

export default function TaskList() {
  const messages = useAppSelector(getNotifyTaskMessagesSelector);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", maxHeight: "160px", overflow: "auto" }}>
      {messages.map((message, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TaskItem key={`msg${index}`} message={message} isDivider={index < messages.length - 1} />
      ))}
    </List>
  );
}
