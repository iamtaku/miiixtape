import { useQuery } from "react-query";
import { getUser } from "../adapters";

export const GetUser = (search?: string) =>
  useQuery("authenticateUser", () => getUser(search));
