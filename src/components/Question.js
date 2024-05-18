import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const Question = (props) => {
    const {id, author, timestamp, optionOne, optionTwo} = props.question;
    const navigate = useNavigate();

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title>{id}</Card.Title>
                    <Card.Text>{optionOne.text} <span
                        style={{fontWeight: 'bold'}}>or</span> {optionTwo.text} ?</Card.Text>
                    <Card.Text>{author} - {formatDate(timestamp)}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Button onClick={() => navigate(`/questions/${id}`)}>
                        View
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
};

const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString("en-US");
    return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

const mapStateToProps = () => ({});


export default connect(mapStateToProps)(Question);
