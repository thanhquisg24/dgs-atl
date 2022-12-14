import { IDgsLineTypeEntity } from "@adapters/entity";
import { useAppSelector } from "@hooks/useReduxToolKit";
import { getListLineType } from "@store/selector";
import { find } from "lodash";
import React from "react";

export function useMemoCurrentLineType(lineTypeId: number): IDgsLineTypeEntity | null {
  const listLineType = useAppSelector(getListLineType);
  const resut = React.useMemo(() => {
    const match = find(listLineType, { idLineType: lineTypeId });
    return match || null;
  }, [lineTypeId, listLineType]);
  return resut;
}
