import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./redux/store";
import "../src/styles/reset.css";
import "../src/styles/styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
