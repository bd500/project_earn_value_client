import {Card, Col, ProgressBar, Row, Table} from "react-bootstrap";
import {IoBriefcaseOutline} from "react-icons/io5";
import {FiClipboard} from "react-icons/fi";
import ProjectSumary from "../../components/ProjectSumary/ProjectSumary";
import Meta from "../../components/Meta/Meta";

interface Project {
    name: string;
    note?: string;
    status: string;
}

const DashboardScreen = () => {
    const projects = [
        {
            name: "123",
            status: "Ongoing",
        },
        {
            name: "456",
            status: "Completed",
        },
        {
            name: "789",
            note: "this is a note",
            status: "At Risk",
        },
    ];

    let completed = 0;
    let atRisk = 0;
    let ongoing = 0;

    projects.forEach((p) => {
        if (p.status === "Completed") completed++;
        else if (p.status === "Ongoing") ongoing++;
        else atRisk++;
    });

    const progress = [
        {name: "completed", value: completed, color: "#00C49F"},
        {name: "Ongoing", value: ongoing, color: "#0088FE"},
        {name: "At Risk", value: atRisk, color: "#FF8042"},
    ];

    const renderProject = (project: Project) => {
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
                                <Col>Projects</Col>
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
                                <Col>Tasks</Col>
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
                        <Card.Text>{`${completed}/${projects.length}`}</Card.Text>
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
