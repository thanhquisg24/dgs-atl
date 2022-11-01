import moment from "moment";

export function formatGameDateTimeTree(dateISO: string): string | null {
  const m = moment(dateISO);
  const reulstStr = m.format("MM/DD");
  return reulstStr;
}
export function formatToLLLDateStr(dateISO: string): string {
  const m = moment(dateISO);
  return m.format("lll");
}
export function formatToUsDateStr(dateISO: string): string {
  const m = moment(dateISO);
  return m.format("MM/DD/YYYY HH:mm:ss");
}

export function getDateLLL(): string {
  const m = moment();
  return m.format("lll");
}

export function timeFromNow(d: Date): string {
  const f = moment(d).fromNow();
  return f;
}

export function getDate(): Date {
  const d = moment().toDate();
  return d;
}
