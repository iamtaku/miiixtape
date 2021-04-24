import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
// import { useQuery } from "react-query";
// import { authenticateUser } from "../queries";
import { GetUser } from "../queries";
interface UserAttributes {
  access_token: string;
  refresh_token: string;
  spotify_id: string;
  username: string;
}

interface UserResponse {
  id: string;
  attributes: UserAttributes;
}

const setTokens = ({ attributes, id }: UserResponse) => {
  // debugger;
  console.log(attributes, id);
  window.localStorage.setItem("access_token", attributes.access_token);
  window.localStorage.setItem("refresh_token", attributes.refresh_token);
};

const Callback = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { isLoading, error, data } = GetUser(search);

  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }

  window.history.replaceState(null, "new page title", "/app");
  return (
    <div>
      {search}
      <h2>this is the callback component!</h2>
      {error}
      {isLoading ? "loading" : "finished"}
    </div>
  );
};

export default Callback;
