import React from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import { GetUser } from "../queries/GetUser";

export const Sidebar = () => {
  // const queryClient = useQueryClient();
  // const something = queryClient.getQueryData(["userInfo"])!;
  const { data: userInfo } = GetUser();

  return (
    <div>
      <h2>this is the sidebar</h2>
    </div>
  );
};
