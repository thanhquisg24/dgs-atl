import { IDonbestSportBookEntity } from "@adapters/entity";
import { useFieldArray, useFormContext } from "react-hook-form";
import { LeagueOddsRow } from "../league/league-odds-row";

interface IProps {
  listSportBook: IDonbestSportBookEntity[];
}
export function GameOddsRows(props: IProps) {
  const { listSportBook } = props;
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name: "periodConfig",
  });
  return (
    <>
      {fields.map((item, index) => (
        <LeagueOddsRow
          key={item.id}
          indexField={index}
          control={control}
          listSportBook={listSportBook}
          //@ts-ignore
          periodCodeNumber={item.period}
        />
      ))}
    </>
  );
}
