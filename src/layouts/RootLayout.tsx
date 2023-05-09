import {Outlet} from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import {Row, Col, Container} from "react-bootstrap";

const RootLayout = () => {
    return (
        <div>
            <Row>
                <Col md={1}>
                    <SideBar />
                </Col>
                <Col md={11}>
                    <Container className="mx-2 my-3">
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};
export default RootLayout;
