import { useAppSelector } from "@hooks/useReduxToolKit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { ListItemIcon } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ITaskMessageItem } from "@store/models/notify-task-model";
import { getNotifyTaskMessagesSelector } from "@store/selector";
import { timeFromNow } from "@utils/date-format";

const StatusMap = {
  PENDING: (
    <ListItemIcon sx={{ color: orange[500] }}>
      <AccessTimeIcon />
    </ListItemIcon>
  ),
  START: (
    <ListItemIcon sx={{ color: blue[500] }}>
      <PlayCircleOutlineIcon />
    </ListItemIcon>
  ),
  SUCCESS: (
    <ListItemIcon sx={{ color: green[500] }}>
      <CheckCircleOutlineIcon />
    </ListItemIcon>
  ),
  FAIL: (
    <ListItemIcon sx={{ color: red[500] }}>
      <ErrorOutlineIcon />
    </ListItemIcon>
  ),
};

function TaskItem(props: { message: ITaskMessageItem; isDivider: boolean }) {
  const { message, isDivider } = props;
  return (
    <ListItem divider={isDivider}>
      {StatusMap[message.status]}
      <ListItemText primary={message.text} secondary={timeFromNow(message.time)} />
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
