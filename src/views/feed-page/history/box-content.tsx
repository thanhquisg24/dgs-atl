import { Grid } from "@mui/material";
import { gridSpacing } from "@store/constant";
import HistoryTable from "./history-table";

export default function BoxContent() {
  return (
    <Grid spacing={gridSpacing} container>
      {/* <Grid item md={2}>
          <FormControl fullWidth>
            <Button variant="contained">Refresh</Button>
          </FormControl>
        </Grid> */}

      <Grid item md={12}>
        <HistoryTable></HistoryTable>
      </Grid>
    </Grid>
  );
}
