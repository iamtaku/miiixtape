import { Redirect, Route, RouteProps } from "react-router";
import { isAuthenticated } from "../helpers/utils";

export type ProtectedRouteProps = {
  // isAuthenticated: boolean;
} & RouteProps;

export const ProtectedRoute = ({ ...routeProps }: ProtectedRouteProps) => {
  if (isAuthenticated()) {
    return <Route {...routeProps} />;
  } else {
    console.log("unauthenticated");
    return <Redirect to={{ pathname: "/login" }} />;
  }
};
