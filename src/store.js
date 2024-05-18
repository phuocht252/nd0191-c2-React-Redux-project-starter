import {configureStore} from "@reduxjs/toolkit";
import {loadingBarReducer} from "react-redux-loading-bar";

import logger from "./middleware/logger";

import authedUser from "./reducers/authedUser";
import users from "./reducers/users";
import questions from "./reducers/questions";

export const store = configureStore({
    reducer: {
        authedUser,
        users,
        questions,
        loadingBar: loadingBarReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
