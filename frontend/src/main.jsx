import React from "react";
import ReactDOM from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import "./assets/fonts/font.css";
import themeConfig from "./themeConfig";
import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={themeConfig}>
        <App />{" "}
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
