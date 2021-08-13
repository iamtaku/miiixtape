import { useLocation, useHistory } from "react-router-dom";
import { useGetUser } from "../queries/hooks";

export const Main = () => {
  const { search } = useLocation();
  const history = useHistory();
  console.log(window.localStorage.getItem("token"));
  const { isLoading, data } = useGetUser();

  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <p>Hello {data?.username}</p>;
};
