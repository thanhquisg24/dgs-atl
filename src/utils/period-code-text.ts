export const periodCommon: { [k: number]: string } = {
  0: "FG",
  1: "1H",
  2: "2H",
  3: "1Q",
  4: "2Q",
  5: "3Q",
  6: "4Q",
};
export const periodNHL: { [k: number]: string } = {
  0: "FG",
  7: "1P", //NHL
  8: "2P", //NHL
  9: "3P", //NHL
};
export const periodCodeText: { [k: number]: string } = {
  ...periodCommon,
  ...periodNHL,
};
