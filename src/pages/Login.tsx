import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { LoginButton } from "../components/Buttons";
import api from "../queries/api";
import { ServerTokenResponse } from "../queries/types";

export const Login = () => {
  let history = useHistory();
  useEffect(() => {
    if (history.location.search.includes("code=")) {
      api
        .get<ServerTokenResponse>(`/callback/${history.location.search}`)
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          history.push("/app");
        });
    }
  }, [history]);
  return (
    <div>
      Login
      <LoginButton>Login with Spotify</LoginButton>
    </div>
  );
};
