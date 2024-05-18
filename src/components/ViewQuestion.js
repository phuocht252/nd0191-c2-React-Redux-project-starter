import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {addAnswerAction} from "../actions/questionAction";
import Button from "react-bootstrap/Button";

import {useLocation, useNavigate, useParams} from "react-router-dom";

const ViewQuestion = ({dispatch, authedUser, questions, users, id}) => {
    const author = questions[id].author;
    const question = questions[id];
    const avatarURL = users[author].avatarURL;

    const OPTION_1 = "optionOne";
    const OPTION_2 = "optionTwo";

    const voteOption1 = question.optionOne.votes.includes(authedUser.id);

    const voteOption2 = question.optionTwo.votes.includes(authedUser.id);

    const onOptionClick = (e) => {
        e.preventDefault();
        const answerObj = {
            authedUser: authedUser.id,
            qid: id,
            answer: e.target.value,
        };

        dispatch(addAnswerAction(answerObj));
    };

    const percentage = (num) => {
        const total =
            question.optionOne.votes.length + question.optionTwo.votes.length;

        return (num / total) * 100;
    };

    return (
        <>
            <Card className="text-ceneter">
                <Card.Header className="text-center">
                    <Card.Title>Poll by {author}</Card.Title>
                    <Image
                        style={{width: "100px", height: "100px"}}
                        src={avatarURL}
                        roundedCircle
                    />
                    <Card.Text>Would you rather ?</Card.Text>
                </Card.Header>
                {!voteOption1 && !voteOption2 && (
                    <Card.Body className="d-flex justify-content-around">
                        <Button value={OPTION_1} onClick={onOptionClick}>
                            {question.optionOne.text}
                        </Button>
                        <Button value={OPTION_2} onClick={onOptionClick}>
                            {question.optionTwo.text}
                        </Button>
                    </Card.Body>
                )}
                {(voteOption1 || voteOption2) && (
                    <Card.Body className="d-flex justify-content-around">
                        <Card>
                            <Card.Header>
                                <Card.Title>{question.optionOne.text}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text className="text-center">
                                    {percentage(question.optionOne.votes.length)}%
                                </Card.Text>
                                <Card.Text>{question.optionOne.votes.length} Vote(s):</Card.Text>
                                <ul>
                                    {question.optionOne.votes.map((vote, index) => (
                                        <li key={index}>{vote === authedUser.id ? "Me" : vote}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Card.Title>{question.optionTwo.text}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text className="text-center">
                                    {percentage(question.optionTwo.votes.length)}%
                                </Card.Text>
                                <Card.Text>{question.optionTwo.votes.length} Vote(s):</Card.Text>
                                <ul>
                                    {question.optionTwo.votes.map((vote, index) => (
                                        <li key={index}>{vote === authedUser.id ? "Me" : vote}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                )}
            </Card>
        </>
    );
};

const mapStateToProps = ({authedUser, questions, users}, props) => {
    const {id} = props.router.params;
    return {
        id,
        questions,
        authedUser,
        users,
    };
};

export const withRouter = (Component) => {
    return (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{location, navigate, params}}/>;
    };
};

export default withRouter(connect(mapStateToProps)(ViewQuestion));
