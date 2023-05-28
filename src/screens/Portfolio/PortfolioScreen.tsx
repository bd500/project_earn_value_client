import {useEffect, useState} from "react";
import {Form, Row, Table, Col} from "react-bootstrap";
import {calCost, calPortfolio} from "../../helper/calculator";
import {giveConclustion} from "../../helper/conclusion";
import Meta from "../../components/Meta/Meta";
import {useDispatch, useSelector} from "react-redux";
import {getOneProject, getProjects} from "../../store/projectSlice";
import {AppDispatch, RootState} from "../../store/store";
import {toast} from "react-toastify";
import ReportChart from "../../components/ReportChart/ReportChart";

const PortfolioScreen = () => {
    const initPortfolio = {
        bac: 0,
        ac: 0,
        ev: 0,
        cv: 0,
        cpi: 0,
        vac: 0,
        eac: 0,
        etc: 0,
        sv: 0,
        tv: 0,
        spi: 0,
        pv: 0,
    };

    const [projectId, setProject] = useState("");
    const [portfolio, setPortfolio] = useState(initPortfolio);
    const [reportData, setReportData] = useState({ac: [0], pv: [0], ev: [0]});

    const dispatch = useDispatch<AppDispatch>();
    const {projects, project} = useSelector(
        (state: RootState) => state.projects
    );

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    useEffect(() => {
        if (projectId !== "")
            toast.promise(
                dispatch(getOneProject(projectId))
                    .unwrap()
                    .then((payload) => {
                        setReportData(calCost(payload.tasks));

                        console.log(reportData.ev[reportData.ev.length - 1]);

                        const report = calPortfolio(
                            payload.tasks,
                            reportData.ev[reportData.ev.length - 1]
                        );
                        setPortfolio(report);
                        // console.log(report);
                    }),
                {
                    pending: "Analysing your data...",
                }
            );
        else setPortfolio(initPortfolio);

        // const report =
        //     projectId !== "" ? calPortfolio(project.tasks!!) : initPortfolio;
        // setPortfolio(report);
        // console.log(report);
    }, [projectId]);

    return (
        <>
            <Meta>Portfolio</Meta>
            <h1>Portfolio</h1>
            <div className="mb-4">
                <Form.Select onChange={(e) => setProject(e.target.value)}>
                    <option value={""}>Choose a project</option>
                    {projects.map((p) => (
                        <option value={p.id} key={p.id}>
                            {p.name}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>BAC</th>
                        <th>AC</th>
                        <th>EV</th>
                        <th>CV</th>
                        <th>CPI</th>
                        <th>SV</th>
                        <th>SPI</th>
                        <th>VAC</th>
                        <th>EAC</th>
                        <th>ETC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total:</td>
                        <td>${portfolio.bac}</td>
                        <td>${portfolio.ac}</td>
                        <td>${portfolio.ev}</td>
                        <td>${portfolio.cv}</td>
                        <td>${portfolio.cpi}</td>
                        <td>${portfolio.sv}</td>
                        <td>${portfolio.spi}</td>
                        <td>${portfolio.vac}</td>
                        <td>${portfolio.eac}</td>
                        <td>${portfolio.etc}</td>
                    </tr>
                </tbody>
            </Table>
            {projectId !== "" && (
                <Row>
                    <Col md={1}>
                        <strong>Conclusion:</strong>
                    </Col>
                    <Col>{giveConclustion(portfolio)}</Col>
                    <div>
                        <ReportChart
                            ac={reportData.ac}
                            ev={reportData.ev}
                            pv={reportData.pv}
                        />
                    </div>
                </Row>
            )}
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
