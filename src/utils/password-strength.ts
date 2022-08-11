/**
 * Password validator for login pages
 */
import value from "assets/scss/_themes-vars.module.scss";

// has number
const hasNumber = (num: string | number | any) => new RegExp(/[0-9]/).test(num);

// has mix of small and capitals
const hasMixed = (num: string | number | any) => new RegExp(/[a-z]/).test(num) && new RegExp(/[A-Z]/).test(num);

// has special chars
const hasSpecial = (num: string | number | any) => new RegExp(/[!#@$%^&*)(+=._-]/).test(num);

// set color based on password strength
export const strengthColor = (count: number): any => {
  if (count < 2) return { label: "Poor", color: value.errorMain };
  if (count < 3) return { label: "Weak", color: value.warningDark };
  if (count < 4) return { label: "Normal", color: value.orangeMain };
  if (count < 5) return { label: "Good", color: value.successMain };
  if (count < 6) return { label: "Strong", color: value.successDark };
  return { label: "Poor", color: value.errorMain };
};

// password strength indicator
export const strengthIndicator = (num: any): number => {
  let strengths = 0;
  if (num.length > 5) strengths += 1;
  if (num.length > 7) strengths += 1;
  if (hasNumber(num)) strengths += 1;
  if (hasSpecial(num)) strengths += 1;
  if (hasMixed(num)) strengths += 1;
  return strengths;
};
