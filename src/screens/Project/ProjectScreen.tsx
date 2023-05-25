import {useState} from "react";
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    FormGroup,
    Row,
} from "react-bootstrap";
import Meta from "../../components/Meta/Meta";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {toast} from "react-toastify";
import {createProject} from "../../store/projectSlice";

const ProjectScreen = () => {
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [duration, setDuration] = useState(12);

    const dispatch = useDispatch<AppDispatch>();
    const {project} = useSelector((state: RootState) => state.projects);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(
            dispatch(createProject({name, note, duration})).unwrap(),
            {
                pending: "Processing",
                success: "Success",
                error: "Failed to create new project",
            }
        );
    };

    return (
        <>
            <Meta>Projects</Meta>
            <h1>Manage Projects</h1>
            <Form onSubmit={submitHandler}>
                <h3>Add New Project</h3>
                <Row className="my-3">
                    <Col md={9}>
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
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <FloatingLabel
                                label="Duration (Months)"
                                controlId="floatingDuartion"
                            >
                                <Form.Control
                                    placeholder="Project ABC"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(parseInt(e.target.value))
                                    }
                                />
                            </FloatingLabel>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup className="my-3">
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

                <Button type="submit" className="mb-3">
                    Create
                </Button>
            </Form>
        </>
    );
};
export default ProjectScreen;
