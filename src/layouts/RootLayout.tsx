import {Outlet} from "react-router-dom";
import SideBar from "../components/SideBar";
import {Row, Col, Container} from "react-bootstrap";

const RootLayout = () => {
    return (
        <div>
            <Row>
                <Col md={2}>
                    <SideBar />
                </Col>
                <Col md={8}>
                    <Container>
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};
export default RootLayout;
