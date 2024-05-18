import {connect} from "react-redux";
import {Nav, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom";
import {logoutAction} from "../actions/userAction";

const Navigator = (props) => {
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        props.dispatch(logoutAction());
        navigate("/");
    };

    const onNavigateClick = (key) => {
        if (key === 'home') {
            navigate("/");
        } else if (key === 'leaderboard') {
            navigate("/leaderboard");
        } else if (key === 'add') {
            navigate("/add");
        }
    }

    return (
        <>
            <Navbar className="bg-body-tertiary" data-testid="dashboard">
                <Container className="nav">
                    <Nav>
                        <Nav.Link onClick={() => onNavigateClick('home')}>Home</Nav.Link>
                        <Nav.Link onClick={() => onNavigateClick('leaderboard')}>
                            Leaderboard
                        </Nav.Link>
                        <Nav.Link onClick={() => () => onNavigateClick('add')}>New Poll</Nav.Link>
                    </Nav>

                    <Navbar.Collapse className="d-flex justify-content-end">
                        <Image
                            style={{width: "25px", height: "25px"}}
                            src={
                                props.authedUser
                                    ? props.users[props.authedUser.id].avatarURL
                                    : "../public/logo192.png"
                            }
                            roundedCircle
                        />
                        <Navbar.Text
                            style={{color: "gray", marginLeft: "15px", cursor: "pointer"}}
                            onClick={(e) => {
                                e.preventDefault();
                                props.dispatch(logoutAction());
                                onNavigateClick('home')
                            }}
                        >
                            Logout
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

const mapStateToProps = ({authedUser, users}) => {
    return {
        authedUser,
        users,
    };
};

export default connect(mapStateToProps)(Navigator);
