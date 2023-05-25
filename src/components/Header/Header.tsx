import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {logout} from "../../store/authSlice";

const Header = () => {
    const {userInfo} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/");
    };
    return (
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Earned Value</Navbar.Brand>
                    <Nav className="ml-auto">
                        {!userInfo ? (
                            <>
                                <LinkContainer to={"/login"}>
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={"/register"}>
                                    <Nav.Link>Register</Nav.Link>
                                </LinkContainer>
                            </>
                        ) : (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/dashboard">
                                        Dashboard
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={logoutHandler}>
                                    <Nav.Link>Logout</Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};
export default Header;
