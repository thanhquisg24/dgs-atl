import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function BasicIconTooltip(props: { icon: any; title: string }) {
  const { icon, title } = props;
  return (
    <Tooltip title={title}>
      <IconButton>{icon}</IconButton>
    </Tooltip>
  );
}
