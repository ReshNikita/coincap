import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../redux/store";
import { Copyright } from "../components/Copyright";

const store = configureStore({
  reducer: rootReducer,
});

describe("Copyright", () => {
  it("renders the Copyright component with the correct text", () => {
    render(
      <Provider store={store}>
        <Copyright />
      </Provider>
    );
    const copyrightElement = screen.getByText(/Copyright/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  it("applies the dark class when darkTheme is true", () => {
    render(
      <Provider store={store}>
        <Copyright />
      </Provider>
    );
    const copyrightElement = screen.getByText(/Copyright/i);
    expect(copyrightElement).toHaveClass("copyright false");
  });

  it("does not apply the dark class when darkTheme is false", () => {
    store.dispatch({ type: "theme/setDarkTheme", payload: false });

    render(
      <Provider store={store}>
        <Copyright />
      </Provider>
    );
    const copyrightElement = screen.getByText(/Copyright/i);
    expect(copyrightElement).not.toHaveClass("dark");
  });
});
