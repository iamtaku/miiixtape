import { UserAttributes } from "./types";
import { useQuery } from "react-query";
import axios from "axios";

const getPlaylist = async () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    // return await axios.get();
  }
};

export const GetPlaylists = () =>
  useQuery("plaaaylistAll", () => getPlaylist(), {
    staleTime: Infinity,
  });
