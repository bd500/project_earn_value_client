import {Outlet, useNavigate} from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import {Row, Col, Container} from "react-bootstrap";

const RootLayout = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");

    if (!userInfo) navigate("/");

    return (
        <div>
            <Row>
                <Col md={1}>
                    <SideBar />
                </Col>
                <Col md={11}>
                    <Container className="mx-2 mt-3 my-5">
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};
export default RootLayout;
