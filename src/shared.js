import {setQuestions} from "./actions/questionAction";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {_getQuestions, _getUsers} from "./_DATA";
import {setUsers} from "./actions/userAction";

export const SET_USERS = "SET_USERS";
export const USER_ADD_QUESTION = "USER_ADD_QUESTION";
export const USER_ADD_ANSWER = "USER_ADD_ANSWER";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";
export const SET_QUESTIONS = "SET_QUESTIONS";

export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT = "LOGOUT";


export function initialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return fetchMockupData().then(({users, questions}) => {
            dispatch(setUsers(users));
            dispatch(setQuestions(questions));
        }).finally(() => {
            dispatch(hideLoading());
        });
    };
}

const fetchMockupData = () => {
    return Promise.all([_getUsers(), _getQuestions()]).then(
        ([users, questions]) => ({
            users,
            questions,
        }));
}

