import React from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./store";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter as Router} from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);
