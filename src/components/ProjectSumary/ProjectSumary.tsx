import {Card, Row, Col} from "react-bootstrap";
import {PieChart, Pie, Cell} from "recharts";

interface ProjectSumaryProps {
    progress: {
        name: string;
        color: string;
        value: number;
    }[];
    total: number;
}

const ProjectSumary = ({progress, total}: ProjectSumaryProps) => {
    return (
        <>
            <Card body>
                <Card.Title>Overall Project</Card.Title>
                <Row className="justify-content-center">
                    <PieChart width={150} height={150}>
                        <Pie
                            data={progress}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {progress.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </Row>
                <Row>
                    <Col style={{fontWeight: "500"}}>
                        <Row className="justify-content-center">Total</Row>
                        <Row className="justify-content-center">{total}</Row>
                    </Col>
                    {progress.map((p, index) => (
                        <Col
                            key={index}
                            style={{color: p.color, fontWeight: "500"}}
                        >
                            <Row className="justify-content-center">
                                {p.name}
                            </Row>
                            <Row className="justify-content-center">
                                {p.value}
                            </Row>
                        </Col>
                    ))}
                </Row>
            </Card>
        </>
    );
};
export default ProjectSumary;
