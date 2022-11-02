import { isEmpty, isString } from "lodash";

export const setEmptyOrStr = (v: unknown) => {
  console.log("🚀 ~ file: hook-form.ts ~ line 4 ~ setEmptyOrStr ~ v", v);
  if (isString(v) && isEmpty(v)) return null;
  return v;
};
