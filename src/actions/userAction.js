import {LOGOUT, SET_AUTHED_USER, SET_USERS} from "../shared";

export function setUsers(users) {
    return {
        type: SET_USERS,
        users,
    };
}

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export function logoutAction() {
    return (dispatch) => {
        return dispatch(logout());
    };
}

export function loginAction(username, password) {
    return (dispatch, getState) => {
        const {users} = getState();
        const user = Object.values(users).find(
            (user) => user.id === username && user.password === password
        );
        if (!!user) {
            return dispatch(setAuthedUser(user));
        }
    };
}
