import {Button} from "react-bootstrap";
import Meta from "../../components/Meta/Meta";
import {useNavigate} from "react-router-dom";

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className=" mt-5 ">
            <Meta>Eanred Value Analysis </Meta>
            <section
                style={{
                    height: "600px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    display: "flex",
                }}
            >
                <h1>Keep Projects Under Budget and Schedule</h1>
                <div className="my-3">
                    Create project and review earned value metrics in realtime.
                </div>
                <Button
                    className="rounded-pill py-3 px-5"
                    size="lg"
                    onClick={() => navigate("/login")}
                >
                    Get Started
                </Button>
            </section>
            <hr />
            <section>
                <h1 className="mt-5">Why Us?</h1>
                <div className="my-3">
                    <h2>Standard</h2>
                    Earned Value Management (EVM) is the gold standard for
                    project cost management.
                    <br /> It provides valuable insights into the project’s
                    health by measuring the planned work against actual work
                    completed as well as the associated costs.
                </div>
                <div className="mt-3 mb-5">
                    <h2>Simplified and Easy to Use</h2>
                    Unlike traditional system, our system is simple, lightweight
                    and easy to use.
                </div>
            </section>
            <hr />
            <section
                style={{
                    height: "450px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    display: "flex",
                    textAlign: "center",
                }}
            >
                <div className="mt-5">
                    <h1>Project management, as effective as it gets.</h1>
                    <Button
                        className="rounded-pill mt-3 py-3 px-5"
                        size="lg"
                        onClick={() => navigate("/register")}
                    >
                        Sign Up For Free
                    </Button>
                </div>
            </section>
            <hr />
        </div>
    );
};
export default HomeScreen;
