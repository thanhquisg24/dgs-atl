import moment from "moment";

export function formatGameDateTimeTree(dateISO: string): string | null {
  const m = moment(dateISO);
  const reulstStr = m.format("D MMM");
  return reulstStr;
}
export function formatToLLLDateStr(dateISO: string): string {
  const m = moment(dateISO);
  return m.format("lll");
}

export function getDateLLL(): string {
  const m = moment();
  return m.format("lll");
}
