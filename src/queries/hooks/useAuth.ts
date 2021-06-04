import React, { useEffect, useState } from "react";
import { getUser } from "./GetUser";
import { UserAttributes } from "../types";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState<UserAttributes>();
  const [expiresIn, setExpiresIn] = useState<number>();

  const fetchUser = async () => {
    const data = await getUser();
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      fetchUser();
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  //   return accessToken;
  return user;
};
