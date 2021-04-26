import { useQuery } from "react-query";
import { getUser } from "../adapters";
import { UserAttributes } from "../adapters/types";

export const GetUser = () =>
  useQuery<UserAttributes, Error>("userInfo", getUser, {
    // staleTime: 3600000,
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
  });

// acce
