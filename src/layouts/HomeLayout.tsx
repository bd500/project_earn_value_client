import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

const HomeLayout = () => {
    return (
        <>
            <Container>
                <Outlet />
            </Container>
        </>
    );
};
export default HomeLayout;
