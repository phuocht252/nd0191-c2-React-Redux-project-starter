import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import Question from "./Question";

const Dashboard = ({questions, authedUser}) => {
    const newQuestions = questions.filter(
        (question) =>
            !question.optionOne.votes.includes(authedUser.id) &&
            !question.optionTwo.votes.includes(authedUser.id)
    );

    const doneQuestions = questions.filter(
        (question) =>
            question.optionOne.votes.includes(authedUser.id) ||
            question.optionTwo.votes.includes(authedUser.id)
    );

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title>Available Questions</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-around">
                            {newQuestions.length !== 0 &&
                                newQuestions.map((question) => {
                                    return <Question key={question.id} question={question}/>;
                                })}
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>
                        <Card.Title>Answered Questions</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-around">
                            {doneQuestions.length !== 0 &&
                                doneQuestions.map((question) => {
                                    return <Question key={question.id} question={question}/>;
                                })}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

const mapStateToProps = ({questions, authedUser}) => {
    return {
        authedUser: authedUser,
        questions: Object.values(questions).sort(
            (a, b) => b.timestamp - a.timestamp
        ),
    };
};

export default connect(mapStateToProps)(Dashboard);
