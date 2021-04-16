import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    // return () => {
    // cleanup
    console.log(location);
    axios
      .get(`http://localhost:3000/api/v1/callback/${location.search}`)
      .then((response) => {
        console.log(response);
        history.push("/app");
      })
      .catch((error) => {
        console.log(error);
        if (location.search === "?error=access_denied") {
          console.error("You need to authorize spotify for this App to work");
          history.push("/error");
        }
      });
  }, [location, history]);
  return (
    <div>
      <h2>this is the callback component!</h2>
    </div>
  );
};

export default Callback;
