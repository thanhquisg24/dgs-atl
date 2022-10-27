import { get, setWith } from "lodash";

export function checkExistsItemIntree(tree: any, itemKey: string | number): boolean {
  if (tree) {
    const o = get(tree, itemKey);
    if (o) {
      return true;
    }
  }
  return false;
}

interface ITableFilter {
  column: { field: string };
  operator: string;
  value: string;
}
export function getFilterForRest(arr: ITableFilter[]): { [x: string]: any } {
  const reduceObj = arr.reduce((obj, cur) => {
    const tmp = {};
    let item: any = setWith(tmp, cur.column.field, `${cur.value}%`);
    if (cur.value === "unchecked" || cur.value === "checked") {
      item = { [cur.column.field]: cur.value === "checked" };
    }
    return { ...obj, ...item };
  }, {});
  return reduceObj;
}
