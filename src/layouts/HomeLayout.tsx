import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import Header from "../components/Header/Header";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    );
};
export default HomeLayout;
