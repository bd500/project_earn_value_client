import {useState} from "react";
import {Button, FloatingLabel, Form, FormGroup} from "react-bootstrap";
import DynamicTable from "../../components/DynamicTable/DynamicTable";

const ProjectScreen = () => {
    const [name, setName] = useState("");
    const [note, setNote] = useState("");

    return (
        <>
            <h1>Manage Projects</h1>
            <Form>
                <h3>Add New Project</h3>
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
                        label="Project Note"
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
                <Button>Create</Button>
            </Form>
            <div>
                <h3>Budget Cost For Work Scheduled</h3>
                <DynamicTable />
            </div>
        </>
    );
};
export default ProjectScreen;
