import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isAuthenticated } from "../helpers/utils";

type ProtectedRouteProps = {
  // isAuthenticated: boolean;
} & RouteProps;

export const ProtectedRoute = ({
  ...routeProps
}: ProtectedRouteProps): JSX.Element => {
  if (isAuthenticated()) {
    return <Route {...routeProps} />;
  } else {
    console.log("unauthenticated");
    return <Redirect to={{ pathname: "/login" }} />;
  }
};
