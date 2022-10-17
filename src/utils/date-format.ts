import moment from "moment";

export function formatGameDateTimeTree(dateISO: string): string | null {
  const m = moment(dateISO);
  const reulstStr = m.format("DD/MM");
  return reulstStr;
}
