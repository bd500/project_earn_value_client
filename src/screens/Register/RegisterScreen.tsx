import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Meta from "../../components/Meta/Meta";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const {userInfo} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({email, name, password}));
    };

    useEffect(() => {
        if (userInfo) navigate("/");
    }, [userInfo, navigate]);

    return (
        <>
            <Meta>Register</Meta>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6} xs={12}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
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
                                    onSubmit={submitHandler}
                                    type="submit"
                                    className="mt-3"
                                    size="lg"
                                >
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default RegisterScreen;
