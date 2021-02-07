import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Button } from "stories/Button";

test("renders learn react link", () => {
	render(<Button label="Jeez Louise" />);
	const linkElement = screen.getByText(/Jeez Louise/i);
	expect(linkElement).toBeInTheDocument();
});
