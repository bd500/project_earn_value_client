import {useEffect, useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import ReportChart from "../../components/ReportChart/ReportChart";
import ParetoChart from "../../components/ParetoChart/ParetoChart";
import projects from "../../data/project";
import data from "../../data/data";
import Meta from "../../components/Meta/Meta";

const ReportScreen = () => {
    const [project, setProject] = useState(-1);
    const [projectData, setProjectData] = useState({});

    useEffect(() => {
        const dt = project !== -1 ? data[project].value : {};
        setProjectData(dt);
    }, [project]);

    return (
        <>
            <Meta>Report</Meta>
            <h1>ReportScreen</h1>
            <p>Report on your project</p>
            <div className="my-4">
                <Form.Select
                    onChange={(e) => setProject(parseInt(e.target.value))}
                >
                    <option value={-1}>Choose a Project</option>
                    {projects.map((p) => (
                        <option value={p.data} key={p.data}>
                            {p.name}
                        </option>
                    ))}
                </Form.Select>
            </div>
            {project !== -1 && <ReportChart data={projectData} />}
            {/* <h5>Biểu đồ chi phí thực tế</h5>
            {project !== -1 && <ParetoChart data={projectData} />} */}
            <Button variant="danger">Export To Excel</Button>
            <Table>
                <thead>
                    <tr>
                        <th>CV</th>
                        <th>CPI</th>
                        <th>VAC</th>
                        <th>EAC</th>
                        <th>ETC</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
export default ReportScreen;
