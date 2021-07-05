import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Main } from "../components/Main";
import { renderWithClient } from "./queries/utils";
import ReactRouter from "react-router";

test("successful query component", async () => {
  jest
    .spyOn(ReactRouter, "useLocation")
    .mockReturnValue({ search: "error", pathname: "", state: "", hash: "" });

  const result = renderWithClient(<Main />);

  await waitFor(() => result.getByText(/You need to login/));
});
