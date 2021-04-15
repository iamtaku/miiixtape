import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const HomeBtn = ({ onClick }: any) => {
  const URL = "http://localhost:3000/api/v1/auth";

  return <a href={URL}>Login</a>;
};
