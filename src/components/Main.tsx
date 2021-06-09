import { useLocation, useHistory } from "react-router";
import { LoginButton } from "./Buttons";
import { useGetUser } from "../queries/hooks";

export const Main = () => {
  const { search } = useLocation();
  const history = useHistory();

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
  return <p>Hello {data?.username}</p>;
};
