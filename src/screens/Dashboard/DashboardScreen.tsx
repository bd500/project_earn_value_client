import {Card, Col, ProgressBar, Row, Table} from "react-bootstrap";
import {IoBriefcaseOutline} from "react-icons/io5";
import {FiClipboard} from "react-icons/fi";
import ProjectSumary from "../../components/ProjectSumary/ProjectSumary";
import Meta from "../../components/Meta/Meta";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProjects} from "../../store/projectSlice";
import {AppDispatch, RootState} from "../../store/store";

const DashboardScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {projects} = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    let completed = 0;
    let atRisk = 0;
    let ongoing = 0;

    let tasks = 0;
    let tasksFinished = 0;

    projects.forEach((p) => {
        if (p.status === "Completed") completed++;
        else if (p.status === "Ongoing") ongoing++;
        else atRisk++;

        p.tasks?.map((t) => {
            if (t.progress === 100) tasksFinished++;
            tasks++;
        });
    });

    const progress = [
        {name: "completed", value: completed, color: "#00C49F"},
        {name: "Ongoing", value: ongoing, color: "#0088FE"},
        {name: "At Risk", value: atRisk, color: "#FF8042"},
    ];

    const renderProject = (project: any) => {
        return (
            <tr>
                <td>{project.name}</td>
                <td>{project.note ? project.note : "--"}</td>
                <td>{project.status}</td>
                <td>
                    <ProgressBar
                        now={60}
                        variant={
                            project.status === "Ongoing"
                                ? "primary"
                                : project.status === "Completed"
                                ? "success"
                                : "danger"
                        }
                    />
                </td>
            </tr>
        );
    };

    return (
        <>
            <Meta>Dashboard</Meta>
            <h1>Dashboard</h1>
            <Row className="my-3">
                <Col md={2}>
                    <Card body>
                        <Card.Title>
                            <Row>
                                <Col>
                                    <b>Projects</b>
                                </Col>
                                <Col md={5}>
                                    <div
                                        style={{background: "#ceffd7"}}
                                        className="rounded-circle text-center "
                                    >
                                        <IoBriefcaseOutline
                                            color="#00a03d"
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                                margin: "8 0",
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text>{`${completed}/${projects.length}`}</Card.Text>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card body>
                        <Card.Title>
                            <Row>
                                <Col>
                                    <b>Tasks</b>
                                </Col>
                                <Col md={5}>
                                    <div
                                        style={{background: "#ffe7ea"}}
                                        className="rounded-circle text-center"
                                    >
                                        <FiClipboard
                                            color="#ec5763"
                                            style={{
                                                height: "30px",
                                                width: "30px",
                                                margin: "8 0",
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text>{`${tasksFinished}/${tasks}`}</Card.Text>
                    </Card>
                </Col>
            </Row>
            <Row className="my-3">
                <Col md={8}>
                    <Card body>
                        <Card.Title>Project Sumary</Card.Title>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Note</th>
                                    <th>Status</th>
                                    <th>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((p) => renderProject(p))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
                <Col md={4}>
                    <ProjectSumary
                        progress={progress}
                        total={projects.length}
                    />
                </Col>
            </Row>
        </>
    );
};
export default DashboardScreen;
