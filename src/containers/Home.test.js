import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

test("renders header", () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/watch-together/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders subtitle", () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(
    "A website to watch a youtube video together with someone who is not directly next to you!"
  );
  expect(linkElement).toBeInTheDocument();
});
