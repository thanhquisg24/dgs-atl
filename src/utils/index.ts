import { get } from "lodash";

export function checkExistsItemIntree(tree: any, itemKey: string | number): boolean {
  if (tree) {
    const o = get(tree, itemKey);
    if (o) {
      return true;
    }
  }
  return false;
}
