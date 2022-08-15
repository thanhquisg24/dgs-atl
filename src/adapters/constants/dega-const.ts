/* eslint-disable no-shadow */
export enum ODDS_TYPE {
  US = "US",
  DECIMAL = "DECIMAL",
  FRACTIONAL = "FRACTIONAL",
  REAL = "REAL",
  RELATIVE = "RELATIVE",
}
export const ODDS_TYPE_ARRAY = [
  {
    id: 1,
    name: ODDS_TYPE.US,
  },
  {
    id: 2,
    name: ODDS_TYPE.DECIMAL,
  },
  {
    id: 3,
    name: ODDS_TYPE.FRACTIONAL,
  },
  {
    id: 4,
    name: ODDS_TYPE.REAL,
  },
  {
    id: 5,
    name: ODDS_TYPE.RELATIVE,
  },
];
export const HOME_TEAM_DISPLAY_TYPE = {
  TOP_LEFT: 1,
  BOTTOM_RIGHT: 2,
};
export const LINE_DISPLAY_TYPE = {
  TOP_BOTTOM: 1,
  LEFT_RIGHT: 2,
};

export const DEGA_ICONS_PATH = "/static/images/icons/icon-sport-svg/";
export const SPORT_ICONS: { [key: number]: { id: string; icon: string } } = {
  26: {
    id: "soccer",
    icon: "soccer.svg",
  },

  1: {
    id: "soccer",
    icon: "soccer.svg",
  },
  2: {
    id: "basketball",
    icon: "basketball.svg",
  },
  3: {
    id: "tennis",
    icon: "tennis.svg",
  },
  4: {
    id: "gaelic-football",
    icon: "gaelic-football.svg",
  },
  5: {
    id: "gaelic-football",
    icon: "gaelic-football.svg",
  },
  6: {
    id: "baseball",
    icon: "baseball.svg",
  },
  7: {
    id: "hurling",
    icon: "hurling.svg",
  },
  8: {
    id: "snooker",
    icon: "snooker.svg",
  },
  9: {
    id: "american-football",
    icon: "american-football.svg",
  },
  10: {
    id: "cricket",
    icon: "cricket.svg",
  },
  11: {
    id: "soccer",
    icon: "soccer.svg",
  },
  12: {
    id: "enhanced-specials",
    icon: "enhanced-specials.svg",
  },
  13: {
    id: "tennis",
    icon: "tennis.svg",
  },
  14: {
    id: "tennis",
    icon: "tennis.svg",
  },
  15: {
    id: "rugby-union",
    icon: "rugby-union.svg",
  },
  16: {
    id: "rugby-league",
    icon: "rugby-league.svg",
  },
  17: {
    id: "australian-rules",
    icon: "australian-rules.svg",
  },
  18: {
    id: "enhanced-specials",
    icon: "enhanced-specials.svg",
  },
  19: {
    id: "boxing",
    icon: "boxing.svg",
  },
  20: {
    id: "gaelic-football",
    icon: "gaelic-football.svg",
  },
  21: {
    id: "hurling",
    icon: "hurling.svg",
  },
  22: {
    id: "gaelic-football",
    icon: "gaelic-football.svg",
  },
  23: {
    id: "gaelic-football",
    icon: "gaelic-football.svg",
  },
  24: {
    id: "tennis",
    icon: "tennis.svg",
  },
  25: {
    id: "virtuals",
    icon: "virtuals.svg",
  },
};

export const VISITOR_OR_UNDER_DOG = 0;
export const HOME_OR_OVER_DOG = 1;
export enum PERIOD {
  FINAL = 0,
  FIRST_HALF = 1,
  SECOND_HALF = 2,
}
export enum MARKET_TYPE {
  TYPE_MONEYLINE = 0,
  TYPE_MONEYLINE_DRAW = 1,
  TYPE_HANDICAP = 2,
  TYPE_TOTAL = 3,
}
export const MARKET_TITLE_MAP: { [key: number]: string } = {
  [MARKET_TYPE.TYPE_MONEYLINE]: "MONEYLINE",
  [MARKET_TYPE.TYPE_MONEYLINE_DRAW]: "MONEYLINE",
  [MARKET_TYPE.TYPE_HANDICAP]: "HANDICAP",
  [MARKET_TYPE.TYPE_TOTAL]: "TOTAL",
};
export const PERIOD_MAP: { [key: number]: string } = {
  [PERIOD.FINAL]: "",
  [PERIOD.FIRST_HALF]: "1ST HALF ",
  [PERIOD.SECOND_HALF]: "2ND HALF ",
};
export const LEAGUE_PRIORITY: { [priority: string]: number } = {
  HIGHEST: 2,
  HIGH: 1,
  NORMAL: 0,
  LOW: -1,
  LOWEST: -2,
};
