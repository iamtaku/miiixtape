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

  // useEffect(() => {
  //   console.log(data?.data);
  //   data && setTokens(data.data.data);
  //   // history.push("/app");
  // }, [data]);
  // useEffect(() => {
  //   // return () => {
  //   // cleanup
  //   console.log(location);
  //   axios
  //     .get(`http://localhost:3000/api/v1/callback/${location.search}`)
  //     .then((response) => {
  //       console.log(response);
  //       // we need to set the access token in our state
  //       window.localStorage.setItem(
  //         "access_token",
  //         response.data.user.access_token
  //       );
  //       history.push("/app");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [location, history]);

  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }
  return (
    <div>
      {search}
      <h2>this is the callback component!</h2>
    </div>
  );
};

export default Callback;
