import { useNavigate } from "react-router-dom";

export function useRouteFunc() {
  const navigate = useNavigate();
  const gotoPage = (path: string) => navigate(path);
  return { gotoPage };
}
