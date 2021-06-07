import { useLocation, useHistory } from "react-router";
import { LoginButton } from "./Buttons";
// import { GetToken } from "../queries/hooks/GetToken";
import { InnerLayout } from "./grid/InnerLayout";
import React from "react";
import { Layout } from "./Layout";
import { useGetUser } from "../queries/hooks/plaaaylist";

export const Main = () => {
  const { search } = useLocation();
  const history = useHistory();
  // GetToken();

  const { isLoading, error, data } = useGetUser();
  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }

  const token = window.localStorage.getItem("token");
  if (!token)
    return (
      <>
        <h2>You need to login</h2>
        <LoginButton>Login</LoginButton>
      </>
    );
  return (
    <Layout>
      <InnerLayout>
        <p>Hello {data?.username}</p>
      </InnerLayout>
    </Layout>
  );
};
