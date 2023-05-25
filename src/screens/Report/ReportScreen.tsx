import {useEffect, useState} from "react";
import {Form, Table} from "react-bootstrap";
import ReportChart from "../../components/ReportChart/ReportChart";
import ParetoChart from "../../components/ParetoChart/ParetoChart";
import projects from "../../data/project";
import data from "../../data/data";
import Meta from "../../components/Meta/Meta";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {getProjects} from "../../store/projectSlice";

const ReportScreen = () => {
    const [project, setProject] = useState("");
    const [projectData, setProjectData] = useState({});

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // const dt = project !== -1 ? data[project].value : {};
        const dt = project ? data[0].value : {};
        setProjectData(dt);
    }, [project]);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    return (
        <>
            <Meta>Report</Meta>
            <h1>{project ? "Nothing" : "Project"} Report</h1>
            <div className="my-4">
                <Form.Select onChange={(e) => setProject(e.target.value)}>
                    <option value={""}>Choose a Project</option>
                    {projects.map((p) => (
                        <option value={p.data} key={p.data}>
                            {p.name}
                        </option>
                    ))}
                </Form.Select>
            </div>
            {project !== "" && <ReportChart data={projectData} />}
            {/* <h5>Biểu đồ chi phí thực tế</h5>
            {project !== -1 && <ParetoChart data={projectData} />} */}

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
