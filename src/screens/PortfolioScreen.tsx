import React, {useState} from "react";
import {Container, Form, Row, Table, Col} from "react-bootstrap";

const PortfolioScreen = () => {
    const [project, setProject] = useState("");

    return (
        <>
            <h1>Portfolio</h1>
            <div className="mb-4">
                <Form.Select onChange={(e) => setProject(e.target.value)}>
                    <option value={project}>Choose a project</option>
                </Form.Select>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>BAC</th>
                        <th>AC</th>
                        <th>EV</th>
                        <th>CV</th>
                        <th>CPI</th>
                        <th>VAC</th>
                        <th>EAC</th>
                        <th>ETC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total:</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>$0</td>
                        <td>$0</td>
                    </tr>
                </tbody>
            </Table>
            <div className="portfolio-desc mt-3">
                <Row>
                    <Col md={3}>
                        <strong>Budgeted At Completion (BAC):</strong>{" "}
                    </Col>
                    <Col md={9}>Total project budget allocated (baseline)</Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Actual Cost (AC):</strong>{" "}
                    </Col>
                    <Col md={9}>Project budget used</Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Earned Value (EV):</strong>{" "}
                    </Col>
                    <Col md={9}>
                        A quantified measurement of project progress in $, can
                        be used as revenue recognition on an accrual basis
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Cost Variance (CV):</strong>{" "}
                    </Col>
                    <Col md={9}>
                        Project cost overrun/underrun in $ (less than 0 is
                        overrun, greater than 0 is underrun)
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Cost Performance Index (CPI):</strong>{" "}
                    </Col>
                    <Col md={9}>
                        Project cost overrun/underrun as a ratio (less than 1 is
                        overrun, greater than 1 is underrun, e.g. 0.8 means 20%
                        overrun)
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Variance At Completion (VAC):</strong>{" "}
                    </Col>
                    <Col md={9}>
                        Cost Variance (CV) forecast at project completion if
                        current trend continues
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Estimate At Completion (EAC):</strong>{" "}
                    </Col>
                    <Col md={9}>
                        Total project cost forecast at project completion if
                        current trend continues
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong>Estimate To Completion (ETC):</strong>{" "}
                    </Col>
                    <Col md={9}>
                        Remaining project cost forecast for project completion
                        if current trend continues
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default PortfolioScreen;
