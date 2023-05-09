import {FormSelect, ProgressBar, Table} from "react-bootstrap";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import {useState} from "react";

const TrackScreen = () => {
    const [project, setProject] = useState("");

    return (
        <>
            <h1>Track Your Working Project</h1>
            <h3>Actual Cost For Perform Scheduled</h3>
            <div className="mb-4">
                <FormSelect onChange={(e) => setProject(e.target.value)}>
                    <option value={project}>Choose a Project</option>
                </FormSelect>
            </div>
            <DynamicTable />
            <div>
                <h3>Budget Cost For Work Performed</h3>
                <Table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <th>Task</th>
                            <th>Allocated Budget($)</th>
                            <th>Completed(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.1</td>
                            <td>132</td>
                            <td>$0</td>
                            <td>
                                <ProgressBar now={60} label={`60%`} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    );
};
export default TrackScreen;
