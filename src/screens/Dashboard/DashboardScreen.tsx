import {Card, Col, Row} from "react-bootstrap";

interface Project {
    name: string;
    note: string;
    createdAt: string;
    updatedAt: string;
}

const DashboardScreen = () => {
    const projects = [
        {
            name: "123",
            note: "nothing",
            createdAt: new Date().toLocaleDateString(),
            updatedAt: new Date().toLocaleDateString(),
        },
    ];

    const renderCard = (project: Project) => {
        return (
            <Col lg={3}>
                <Card className="my-3 p-3 rounded">
                    <Card.Body>
                        <Card.Title>{project.name}</Card.Title>
                        <Card.Text>*Note: {project.note}</Card.Text>
                    </Card.Body>
                    <Row>
                        <Col>
                            Created At: <em>{project.createdAt}</em>
                        </Col>
                        <Col>
                            Last Modified: <em>{project.updatedAt}</em>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    };

    return (
        <>
            <h1>Dashboard</h1>
            <h3>Working Project</h3>
            <div>{projects.map((p) => renderCard(p))}</div>
        </>
    );
};
export default DashboardScreen;
