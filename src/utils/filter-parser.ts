import { setWith } from "lodash";

// eslint-disable-next-line no-shadow
export enum Operation {
  EQUAL = "=",
  NOTEQUAL = "Not",
  LESSTHAN = "Lt",
  LESSTHANOREQUAL = "Le",
  GREATER = "Gt",
  GREATEROREQUAL = "Ge",
  IN = "In",
  NOTIN = "NotIn",
  LIKEBOTH = "LikeBoth",
  LIKEEND = "LikeEnd",
  LIKEFIRST = "LikeFisrt",
}

export interface IFilterOperation {
  operator: Operation;
  fieldRest: string;
}
interface ITableFilter {
  column: { field: string; customFilterObj: IFilterOperation };

  value: string;
}
export function parseFilterForRest(arr: ITableFilter[]): { [x: string]: any } {
  const reduceObj = arr.reduce((obj, cur) => {
    const tmp = {};
    let item: any = setWith(tmp, cur.column.customFilterObj.fieldRest, cur.value);
    switch (cur.column.customFilterObj.operator) {
      case Operation.EQUAL:
        break;
      case Operation.NOTEQUAL:
        break;
      case Operation.LESSTHAN:
        break;
      case Operation.LESSTHANOREQUAL:
        break;
      case Operation.GREATER:
        break;
      case Operation.GREATEROREQUAL:
        break;
      case Operation.IN:
        if (cur.value.length === 0) {
          item = {};
        }
        break;
      case Operation.NOTIN:
        break;
      case Operation.LIKEBOTH:
        item = setWith(tmp, cur.column.field, `%${cur.value}%`);
        break;
      case Operation.LIKEEND:
        item = setWith(tmp, cur.column.field, `${cur.value}%`);
        break;
      case Operation.LIKEFIRST:
        item = setWith(tmp, cur.column.field, `%${cur.value}`);
        break;
      default:
        break;
    }

    if (cur.value === "unchecked" || cur.value === "checked") {
      item = { [cur.column.customFilterObj.fieldRest]: cur.value === "checked" };
    }
    return { ...obj, ...item };
  }, {});
  return reduceObj;
}
