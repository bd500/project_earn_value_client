import {
    Button,
    Form,
    FormSelect,
    InputGroup,
    ProgressBar,
    Table,
} from "react-bootstrap";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import {useState} from "react";
import {FaSave} from "react-icons/fa";
import Meta from "../../components/Meta/Meta";

const TrackScreen = () => {
    const [project, setProject] = useState("");

    return (
        <>
            <Meta>Track</Meta>
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
                            <th>Earn Value($)</th>
                            <th>Completed(%)</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.1</td>
                            <td>132</td>
                            <td>$0</td>
                            <td>
                                <InputGroup>
                                    <Form.Control placeholder="0" />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </td>
                            <td>
                                {/* <ProgressBar now={60} label={`60%`} /> */}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="success">
                    <FaSave /> Save
                </Button>
            </div>
        </>
    );
};
export default TrackScreen;
