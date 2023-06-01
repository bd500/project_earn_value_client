import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Meta from "../../components/Meta/Meta";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {login} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const LoginScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {userInfo} = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(dispatch(login({email, password})).unwrap(), {
            pending: "Loading",
            error: "Login Failed",
        });
    };

    useEffect(() => {
        if (userInfo) navigate("/dashboard");
    }, [userInfo, navigate]);

    return (
        <>
            <Meta>Login</Meta>
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col md={6} xs={12}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <div className="d-grid">
                                <Button
                                    type="submit"
                                    className="mt-3"
                                    size="lg"
                                >
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default LoginScreen;
