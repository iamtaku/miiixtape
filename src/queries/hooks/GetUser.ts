import { ServerResponse, ServerTokenResponse, UserAttributes } from "../types";
import api from "../api";
import { useQuery } from "react-query";

type Token = string;

const getToken = async (): Promise<Token> => {
  //if we have a token in localstorage return it
  const token = window.localStorage.getItem("token");
  if (token) {
    return token;
  } //otherwise, fetch a token

  const code = window.location.search;
  if (code && !token) {
    try {
      const data = await api().get<ServerTokenResponse>(`/callback/${code}`);
      window.localStorage.setItem("token", data.data.token);
      window.history.replaceState(null, "new page title", "/app");
      return data.data.token;
    } catch (err) {
      throw new Error(err);
    }
  }

  throw new Error("no token");
};

export const GetToken = () => useQuery<Token>("token", getToken);

export const getUser = async (token?: string) => {
  try {
    const data = await api().get("/users");
    return data.data.data.attributes;
  } catch (err) {
    throw new Error(err);
  }
};

export const GetUser = () => {
  const { data: token } = GetToken();
  return useQuery<UserAttributes>("user", () => getUser(token), {
    enabled: !!token,
  });
};
