import {ADD_ANSWER, ADD_QUESTION, SET_QUESTIONS} from "../shared";

export default function questions(state = {}, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };
        case ADD_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat(
                            action.authedUser
                        ),
                    },
                },
            };
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            };
        default:
            return state;
    }
}
