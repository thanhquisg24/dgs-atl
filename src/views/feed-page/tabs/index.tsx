import { useAppSelector } from "@hooks/useReduxToolKit";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { CurrentTabType } from "@store/models/feed-model";
import { getCurrentTabselector } from "@store/selector";
import * as React from "react";
import { GameForm } from "./game/game-form";
import { Leagueform } from "./league/league-form";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const currentTab = useAppSelector(getCurrentTabselector);
  // const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (currentTab === CurrentTabType.LEAGUE) {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [currentTab]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="League" {...a11yProps(0)} />
          <Tab label="Game" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Leagueform />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GameForm />
      </TabPanel>
    </Box>
  );
}
