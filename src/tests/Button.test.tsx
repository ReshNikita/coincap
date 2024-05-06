import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "../components/Button"; // Adjust the import path as necessary

describe("Button", () => {
  it("renders the button with the correct text", () => {
    render(<Button text="Click me" className="" />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the onClick function when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" onClick={handleClick} className="" />);
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the className prop to the button", () => {
    render(<Button text="Click me" className="my-custom-class" />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toHaveClass("my-custom-class");
  });

  it("disables the button when the disabled prop is true", () => {
    render(<Button text="Click me" disabled className="" />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeDisabled();
  });
});
