import {connect} from "react-redux";
import {addQuestionAction} from "../actions/questionAction";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewQuestion = ({dispatch, authedUser}) => {
    const navigate = useNavigate();

    const firstOptionRef = useRef("");
    const secondOptionRef = useRef("");

    return (
        <>
            <Form className="text-center">
                <h2>New Poll</h2>
                <Form.Group>
                    <Form.Label data-testid="label1">First Option</Form.Label>
                    <Form.Control
                        data-testid="option1"
                        ref={firstOptionRef}
                        type="text"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label data-testid="label2">Second Option</Form.Label>
                    <Form.Control
                        data-testid="option2"
                        ref={secondOptionRef}
                        type="text"
                    />
                </Form.Group>

                <Button
                    data-testid="submitQuestion"
                    variant="primary"
                    onClick={(e) => {
                        const option1 = firstOptionRef.current["value"];
                        const option2 = secondOptionRef.current["value"];
                        const question = {
                            optionOneText: option1,
                            optionTwoText: option2,
                            author: authedUser.id,
                        };

                        if (option1 !== "" && option2 !== "") {
                            dispatch(addQuestionAction(question));
                            navigate("/");
                        } else {
                            alert("Please input both fields");
                        }

                        firstOptionRef.current["value"] = "";
                        secondOptionRef.current["value"] = "";
                    }}
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser,
    };
};

export default connect(mapStateToProps)(NewQuestion);
