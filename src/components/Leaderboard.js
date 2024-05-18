import {connect} from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

const Leaderboard = ({users}) => {
    return (
        <>
            <Container className=" mt-1">
                <Table>
                    <thead>
                    <tr>
                        <th className="text-center">Rank</th>
                        <th>Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(users)
                        .sort((a, b) => {
                            const aUser = users[a];
                            const bUser = users[b];
                            const aAnswer = Object.keys(aUser.answers).length;
                            const bAnswer = Object.keys(bUser.answers).length;
                            const questionsA = aUser.questions.length;
                            const questionsB = bUser.questions.length;
                            return bAnswer + questionsB - (aAnswer + questionsA);
                        })
                        .map((user, index) => (
                            <tr key={user}>
                                <td className="text-center">{index + 1}</td>
                                <td>
                                    <Image
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                        }}
                                        src={users[user].avatarURL}
                                        alt="avatar"
                                        roundedCircle
                                    />
                                    <span style={{
                                        paddingLeft: "25px",
                                    }}>{users[user].name}</span>
                                </td>
                                <td>{Object.keys(users[user].answers).length}</td>
                                <td>{users[user].questions.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

const mapStateToProps = ({users}) => {
    return {
        users,
    };
};

export default connect(mapStateToProps)(Leaderboard);
