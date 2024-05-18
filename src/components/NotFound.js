import {connect} from "react-redux";

const NotFound = () => {
    return (
        <>
            <div>
                <h1>Error 404</h1>
                <h2>not found</h2>
            </div>
        </>
    );
};

export default connect()(NotFound);
