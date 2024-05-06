import { render, screen } from "@testing-library/react";
import { Loader } from "../components/Loader"; // Adjust the import path as necessary

describe("Loader", () => {
  it("renders the Loader component", () => {
    render(<Loader />);
    const spinElement = screen.getByTestId("spin-element");
    expect(spinElement).toBeInTheDocument();
  });

  it("displays the LoadingOutlined icon", () => {
    render(<Loader />);
    const iconElement = screen.getByTestId("loading-outlined-icon");
    expect(iconElement).toBeInTheDocument();
  });
});
