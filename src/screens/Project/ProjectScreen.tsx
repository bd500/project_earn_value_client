import {useEffect, useState} from "react";
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    FormGroup,
    Row,
    Tab,
    Tabs,
} from "react-bootstrap";
import Meta from "../../components/Meta/Meta";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {toast} from "react-toastify";
import {createProject, getProjects} from "../../store/projectSlice";
import {IoReloadSharp} from "react-icons/io5";
import ProjectItem from "../../components/ProjectItem/ProjectItem";

const ProjectScreen = () => {
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [duration, setDuration] = useState(12);

    const dispatch = useDispatch<AppDispatch>();
    const {project, projects} = useSelector(
        (state: RootState) => state.projects
    );

    useEffect(() => {
        dispatch(getProjects());
    }, []);

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

    const reloadHandler = () => {
        dispatch(getProjects());
    };

    return (
        <>
            <Meta>Projects</Meta>
            <h1>Manage Projects</h1>
            <Tabs defaultActiveKey={"create"} className="my-3" fill>
                <Tab title="Add new Project" eventKey={"create"}>
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
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
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
                                                setDuration(
                                                    parseInt(e.target.value)
                                                )
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
                </Tab>
                <Tab title="Projects List" eventKey={"project-list"}>
                    <h3>All Projects</h3>
                    <Button
                        variant="light"
                        onClick={reloadHandler}
                        className="my-2"
                    >
                        <IoReloadSharp />
                    </Button>
                    {projects.map((p, index) => (
                        <ProjectItem
                            duration={p.duration!!}
                            name={p.name!!}
                            note={p.note}
                            id={p.id!!}
                            index={index.toString()}
                        />
                    ))}
                </Tab>
            </Tabs>
        </>
    );
};
export default ProjectScreen;
