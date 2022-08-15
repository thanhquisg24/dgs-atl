// project imports
import config from "../../config";

// action - state management
import * as actionTypes from "../actions/themes-actions";

interface IThemesModel {
  isOpen: any[]; // for active default menu
  fontFamily: string;
  borderRadius: number;
  opened: boolean;
}
export const initialStateThemes: IThemesModel = {
  isOpen: [], // for active default menu
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const themesReducer = (state = initialStateThemes, action: any) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id],
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily,
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius,
      };
    default:
      return state;
  }
};

export default themesReducer;
