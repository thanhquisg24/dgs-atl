import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { gridSpacing } from "@store/constant";
import React from "react";
import HistoryTable from "./history-table";

export default function BoxContent() {
  return (
    <fieldset>
      <legend>Update History</legend>
      <Grid spacing={gridSpacing} container>
        <Grid item md={2}>
          <FormControl fullWidth>
            <Select size="small" value={10} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>ten20</MenuItem>
              <MenuItem value={20}>Twenty 20</MenuItem>
              <MenuItem value={30}>Thirty20</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2}>
          <FormControl fullWidth>
            <Select size="small" value={10} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={2}>
          <FormControl fullWidth>
            <Select size="small" value={10} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={2}>
          <FormControl fullWidth>
            <TextField size="small" />
          </FormControl>
        </Grid>
        <Grid item md={2}>
          <FormControl fullWidth>
            <Button variant="contained">Refresh</Button>
          </FormControl>
        </Grid>

        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Typography variant="h6" sx={{ flex: 1, mr: 1 }}>
              Only Show
            </Typography>
            <FormControlLabel sx={{ flex: 1, mr: 1 }} control={<Checkbox size="small" defaultChecked />} label="FG" />
            <FormControlLabel sx={{ flex: 1, mr: 1 }} control={<Checkbox size="small" defaultChecked />} label="1H" />
            <FormControlLabel sx={{ flex: 1, mr: 1 }} control={<Checkbox size="small" defaultChecked />} label="2H" />
            <FormControlLabel sx={{ flex: 1, mr: 1 }} control={<Checkbox size="small" defaultChecked />} label="1Q" />
            <FormControlLabel sx={{ flex: 1, mr: 1 }} control={<Checkbox size="small" defaultChecked />} label="2Q" />
            <FormControlLabel sx={{ flex: 1, mr: 1 }} control={<Checkbox size="small" defaultChecked />} label="3Q" />
            <FormControlLabel sx={{ flex: 1, mr: 1 }} control={<Checkbox size="small" defaultChecked />} label="4Q" />
          </Grid>
        </Grid>
        <Grid item md={12}>
          <HistoryTable></HistoryTable>
        </Grid>
      </Grid>
    </fieldset>
  );
}
