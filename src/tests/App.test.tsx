import React from "react";
import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
  getByText("this is the landing page!");
});

test("allows user to login", () => {
  const { getByText, getByLabelText, getByDisplayValue } = render(<App />);
  const button = getByText("Login with Spotify");
  fireEvent.click(button);
});
