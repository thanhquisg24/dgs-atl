import { IDonbestSportBookEntity } from "@adapters/entity";
import { Checkbox, FormControl, FormControlLabel, Grid } from "@mui/material";
import { periodCodeText } from "@utils/period-code-text";
import { Control, Controller, FieldValues } from "react-hook-form";
import { LeaguePtsItem } from "./league-pts-item";
import SelectSportbookOdd from "./misc/select-sportbook-odd-row";

interface IProps {
  periodCodeNumber: number;
  indexField: number;
  control: Control<FieldValues, any>;
  listSportBook: IDonbestSportBookEntity[];
}
// export function LeagueOddsRow(props: IProps) {
//   const { indexField, control, listSportBook, periodCodeNumber } = props;
//   return (
//     <Grid container spacing={1} sx={{ mt: 2.5 }} className={indexField % 2 === 0 ? "odd-row-0" : "odd-row-1"}>
//       <Grid item md={4}>
//         <Grid container spacing={1}>
//           <Grid item md={4}>
//             <Controller
//               name={`periodConfig[${indexField}].enabled`}
//               control={control}
//               render={({ field }) => (
//                 <FormControlLabel
//                   control={
//                     <Checkbox size="small" onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
//                   }
//                   label={periodCodeText[periodCodeNumber]}
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item md={8}>
//             <FormControl fullWidth>
//               <Controller
//                 name={`periodConfig[${indexField}].ps`}
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={
//                       <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
//                     }
//                     label="Spread"
//                   />
//                 )}
//               />
//             </FormControl>
//             <LeaguePtsItem
//               showPts
//               ptsName={`periodConfig[${indexField}].ps_point`}
//               jcName={`periodConfig[${indexField}].ps_juice`}
//               control={control}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item md={4}>
//         <Grid container spacing={1}>
//           <Grid item md={4}></Grid>
//           <Grid item md={8}>
//             <FormControl fullWidth>
//               <Controller
//                 name={`periodConfig[${indexField}].ml`}
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={
//                       <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
//                     }
//                     label="Money"
//                   />
//                 )}
//               />
//             </FormControl>
//             <LeaguePtsItem
//               showPts={false}
//               ptsName={`periodConfig[${indexField}].ml_point`}
//               jcName={`periodConfig[${indexField}].ml_juice`}
//               control={control}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item md={4}>
//         <Grid container spacing={1}>
//           <Grid item md={4}></Grid>
//           <Grid item md={8}>
//             <FormControl fullWidth>
//               <Controller
//                 name={`periodConfig[${indexField}].total`}
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={
//                       <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
//                     }
//                     label="Total"
//                   />
//                 )}
//               />
//             </FormControl>
//             <LeaguePtsItem
//               showPts
//               ptsName={`periodConfig[${indexField}].total_point`}
//               jcName={`periodConfig[${indexField}].total_juice`}
//               control={control}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }
export function LeagueOddsRow(props: IProps) {
  const { indexField, control, listSportBook, periodCodeNumber } = props;
  return (
    <Grid container spacing={1} sx={{ mt: 2.5 }} className={indexField % 2 === 0 ? "odd-row-0" : "odd-row-1"}>
      <Grid item md={3} sx={{ pr: 5 }}>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Controller
              name={`periodConfig[${indexField}].enabled`}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox size="small" onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />
                  }
                  label={periodCodeText[periodCodeNumber]}
                />
              )}
            />
          </Grid>
          <Grid item md={12}>
            <FormControl fullWidth>
              <SelectSportbookOdd
                listSportBook={listSportBook}
                control={control}
                name={`periodConfig[${indexField}].dbSportBookId`}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3} sx={{ pr: 5 }}>
        <FormControl fullWidth>
          <Controller
            name={`periodConfig[${indexField}].ps`}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                }
                label="Spread"
              />
            )}
          />
        </FormControl>
        <LeaguePtsItem
          showPts
          ptsName={`periodConfig[${indexField}].ps_point`}
          jcName={`periodConfig[${indexField}].ps_juice`}
          control={control}
        />
      </Grid>
      <Grid item md={3} sx={{ pr: 5 }}>
        <FormControl fullWidth>
          <Controller
            name={`periodConfig[${indexField}].ml`}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                }
                label="Money"
              />
            )}
          />
        </FormControl>
        <LeaguePtsItem
          showPts={false}
          ptsName={`periodConfig[${indexField}].ml_point`}
          jcName={`periodConfig[${indexField}].ml_juice`}
          control={control}
        />
      </Grid>
      <Grid item md={3} sx={{ pr: 5 }}>
        <FormControl fullWidth>
          <Controller
            name={`periodConfig[${indexField}].total`}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} size="small" />
                }
                label="Total"
              />
            )}
          />
        </FormControl>
        <LeaguePtsItem
          showPts
          ptsName={`periodConfig[${indexField}].total_point`}
          jcName={`periodConfig[${indexField}].total_juice`}
          control={control}
        />
      </Grid>
    </Grid>
  );
}
