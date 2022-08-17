import { RootStateType } from "@store/types";
import { Loading } from "@ui-component/SpinerWrapper";
import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@hooks/useReduxToolKit";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { authChecked, loggedIn, currentUser, isLoading } = useAppSelector((state: RootStateType) => state.auth);

  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// const PrivateRoute = ({ children, ...rest }: any) => {
//   const { authChecked, loggedIn, currentUser, isLoading } = useAppSelector((state: RootStateType) => state.auth);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <Route
//       {...rest}
//       render={({ location }: any) => (loggedIn ? children : <Navigate to="/" state={{ from: location }} />)}
//     />
//   );
// };

export default RequireAuth;
