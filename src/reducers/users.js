import {SET_USERS, USER_ADD_ANSWER, USER_ADD_QUESTION} from "../shared";

export default function users(state = {}, action) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                ...action.users,
            };
        case USER_ADD_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer,
                    },
                },
            };
        case USER_ADD_QUESTION:
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    questions: state[action.author].questions.concat(action.qid),
                },
            };
        default:
            return state;
    }
}
