import {useState} from "react";
import {Form, Table} from "react-bootstrap";

const ReportScreen = () => {
    const [project, setProject] = useState("");

    return (
        <>
            <h1>ReportScreen</h1>
            <p>Report on your completed project</p>
            <div className="my-4">
                <Form.Select onChange={(e) => setProject(e.target.value)}>
                    <option value={project}>Choose a Project</option>
                </Form.Select>
            </div>
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
