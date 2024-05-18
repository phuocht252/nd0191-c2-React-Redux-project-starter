import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Modal} from "react-bootstrap";
import {useRef} from "react";
import {loginAction} from "../actions/userAction";

import {useLocation, useNavigate} from "react-router-dom";

const Login = ({dispatch}) => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const unameRef = useRef("");
    const passRef = useRef("");

    return (
        <>
            <div
                className="modal show"
                style={{display: "block", position: "initial"}}
                data-testid="login-dialog"
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    data-testid="username"
                                    ref={unameRef}
                                    type="username"
                                    placeholder="Enter username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    data-testid="password"
                                    ref={passRef}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={"primary"}
                            onClick={() => {
                                const userRef = unameRef.current["value"];
                                const passwordRef = passRef.current["value"];

                                if (userRef !== "" && passwordRef !== "") {
                                    if (!dispatch(loginAction(userRef, passwordRef))) {
                                        alert("Username or password is incorrect. Try again!");
                                    } else {
                                        navigate(state?.path || "/");
                                    }
                                } else {
                                    alert("Please input both fields");
                                }

                                // Reset value
                                unameRef.current["value"] = "";
                                passRef.current["value"] = "";
                            }}
                            data-testid="submit"
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Login);
