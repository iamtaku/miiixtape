import { Redirect, Route, RouteProps } from "react-router";

export type ProtectedRouteProps = {
  // isAuthenticated: boolean;
} & RouteProps;

export const ProtectedRoute = ({
  // isAuthenticated,
  ...routeProps
}: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    console.log("unauthenticated");
    return <Redirect to={{ pathname: "/login" }} />;
  }
};
