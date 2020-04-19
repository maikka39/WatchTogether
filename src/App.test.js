import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders watch-together title link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/watch-together/i);
  expect(linkElement).toBeInTheDocument();
});
