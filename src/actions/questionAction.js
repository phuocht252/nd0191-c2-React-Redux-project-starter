import {hideLoading, showLoading} from "react-redux-loading-bar";
import {_saveQuestion, _saveQuestionAnswer} from "../_DATA";
import {ADD_ANSWER, ADD_QUESTION, SET_QUESTIONS, USER_ADD_ANSWER, USER_ADD_QUESTION} from "../shared";

export function setQuestions(questions) {
    return {
        type: SET_QUESTIONS,
        questions,
    };
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

export function addQuestionAction({author, optionOneText, optionTwoText}) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author,
        })
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(userAddQuestion(question));
            })
            .then(() => dispatch(hideLoading()));
    };
}

function addAnswer({authedUser, qid, answer}) {
    return {
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer,
    };
}

export function addAnswerAction(answer) {
    return (dispatch) => {
        dispatch(showLoading());
        return _saveQuestionAnswer(answer)
            .then(() => {
                dispatch(addAnswer(answer));
                dispatch(userAddAnswer(answer));
            })
            .then(() => dispatch(hideLoading()));
    };
}

export function userAddAnswer({authedUser, qid, answer}) {
    return {
        type: USER_ADD_ANSWER,
        authedUser,
        qid,
        answer,
    };
}

export function userAddQuestion({author, qid}) {
    return {
        type: USER_ADD_QUESTION,
        author,
        qid,
    };
}