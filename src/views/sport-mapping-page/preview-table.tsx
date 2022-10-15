import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
// import { red } from "@material-ui/core";

// const useStyles = makeStyles({
//   btnColor: {
//     color: red[600],
//   },
// });
// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

interface IProps {
  rows: {
    id: null;
    dbSportId: number;
    dbSportName: string;
    dgsSportId: string;
    dgsSportName: string;
  }[];
  onDeleteRow: (index: number) => void;
}

export default function BasicTable(props: IProps) {
  const { rows, onDeleteRow } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, border: 1 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DonBest Sport</TableCell>
            <TableCell>DGS Sport</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.dbSportId}_${row.dgsSportId}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                {row.dbSportId} - {row.dbSportName}
              </TableCell>
              <TableCell>
                {row.dgsSportId} - {row.dgsSportName}
              </TableCell>
              <TableCell>
                <DeleteIcon color="error" sx={{ cursor: "pointer" }} onClick={() => onDeleteRow(index)}></DeleteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
