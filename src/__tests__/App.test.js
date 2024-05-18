import React from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../store";
import App from "../App";

import {loginAction} from "../actions/userAction";
import {BrowserRouter as Router} from "react-router-dom";
import {initialData} from "../shared";

describe("App", () => {
    it("renders component", () => {
        const component = render(
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it("not logged in: show login page", () => {
        const component = render(
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );
        const login = component.getByTestId("login-dialog");
        expect(login).toBeInTheDocument();
    });

    it("logged in successfully: show dashboard", async () => {
        await store.dispatch(initialData());
        await store.dispatch(loginAction("tylermcginnis", "abc321"));

        const component = render(
            <Provider store={store}>
                <Router>
                    <App/>
                </Router>
            </Provider>
        );

        const dash = component.getByTestId("dashboard");
        expect(dash).toBeInTheDocument();
    });
});
