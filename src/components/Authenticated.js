import {connect} from "react-redux";
import {Outlet} from "react-router-dom";
import Login from "./Login";

function Authenticated({authedUser}) {
    return (
        <>
            <div className=" md:mx-10 mx-4">{authedUser ? <Outlet/> : <Login/>}</div>
        </>
    );
}

const mapStateToProps = ({authedUser}) => ({
    authedUser: authedUser,
});

export default connect(mapStateToProps)(Authenticated);
