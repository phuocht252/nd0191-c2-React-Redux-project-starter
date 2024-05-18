import {connect} from "react-redux";
import {useEffect} from "react";

import {Route, Routes} from "react-router-dom";
import Authenticated from "./components/Authenticated";

import {initialData} from "./shared";

import Dashboard from "./components/Dashboard";
import Navigator from "./components/Navigator";
import Login from "./components/Login";
import ViewQuestion from "./components/ViewQuestion";
import NotFound from "./components/NotFound";
import Leaderboard from "./components/Leaderboard";
import NewQuestion from "./components/NewQuestion";

function App(props) {
    useEffect(() => {
        props.dispatch(initialData());
    }, [props]);

    return (
        <div className="container">
            {props.authedUser && <Navigator/>}
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route element={<Authenticated/>}>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/leaderboard" element={<Leaderboard/>}/>
                    <Route path="/add" element={<NewQuestion/>}/>
                    <Route path="/questions/:id" element={<ViewQuestion/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

const mapStateToProps = ({authedUser}) => ({
    authedUser: authedUser !== null,
});

export default connect(mapStateToProps)(App);
