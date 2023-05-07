import {useState} from "react";
import {
    Button,
    FloatingLabel,
    Form,
    FormGroup,
    ProgressBar,
    Table,
} from "react-bootstrap";

const ProjectScreen = () => {
    const [name, setName] = useState("");
    const [note, setNote] = useState("");

    return (
        <>
            <h1>Manage Projects</h1>
            <Form>
                <FormGroup>
                    <FloatingLabel
                        label="Project Name"
                        controlId="floatingName"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Project ABC"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FloatingLabel>
                </FormGroup>
                <FormGroup>
                    <FloatingLabel
                        label="Project Notes"
                        controlId="floatingNote"
                    >
                        <Form.Control
                            as="textarea"
                            placeholder="Project ABC"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            style={{height: "100px"}}
                        />
                    </FloatingLabel>
                </FormGroup>
                <Button>Save</Button>
            </Form>
            <h1>Progress</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Allocated Budget($)</th>
                        <th>Completed(%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>132</td>
                        <td>$0</td>
                        <td>
                            <ProgressBar now={60} label={`60%`} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};
export default ProjectScreen;
