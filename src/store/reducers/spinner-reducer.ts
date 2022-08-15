import { AnyAction } from "redux";
import { endsWith, omit } from "lodash";
import { ISpinner } from "../models/spinner-model";

export const initialSpinnerState: ISpinner = {};
function replaceLast(find: string, replace: string, str: string) {
  const lastIndex = str.lastIndexOf(find);
  if (lastIndex === -1) {
    return str;
  }
  const beginString = str.substring(0, lastIndex);
  const endString = str.substring(lastIndex + find.length);

  return beginString + replace + endString;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function spinnerReducer(state: ISpinner = initialSpinnerState, action: AnyAction) {
  const uppercaseActionType = action.type.toUpperCase();

  let newPropertiesLoader = {};

  if (endsWith(uppercaseActionType, "_REQUEST")) {
    const keyRq = replaceLast("_REQUEST", "", action.type);
    const initNum = state[keyRq] ? state[keyRq] : 0;
    const upNum = initNum + 1;
    newPropertiesLoader = {
      [keyRq]: upNum,
    };
    return { ...state, ...newPropertiesLoader };
  }
  if (endsWith(uppercaseActionType, "_SUCCESS") || endsWith(uppercaseActionType, "_FAILURE")) {
    let keyRq2 = replaceLast("_SUCCESS", "", action.type);
    keyRq2 = replaceLast("_FAILURE", "", keyRq2);
    const initNum2 = state[keyRq2] ? state[keyRq2] : 0;
    const downNum = initNum2 - 1;
    if (downNum > 0) {
      newPropertiesLoader = {
        [keyRq2]: downNum,
      };
      return { ...state, ...newPropertiesLoader };
    }
    return omit({ ...state }, [keyRq2]);
  }

  return state;
}
