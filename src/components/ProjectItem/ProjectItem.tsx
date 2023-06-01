import {Button, Col, Form, Row} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import {useAccordionButton} from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import {FaEdit, FaRegSave, FaTrash} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {deleteProject, updateProject} from "../../store/projectSlice";
import {useState} from "react";
import {toast} from "react-toastify";

const CustomToggle = ({eventKey}: {eventKey: string}) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log("totally custom!")
    );

    return (
        <>
            <Button
                type="button"
                onClick={decoratedOnClick}
                variant="outline-primary"
            >
                <FaEdit />
            </Button>
        </>
    );
};

const ProjectItem = ({
    id,
    name,
    duration,
    note,
    index,
}: {
    id: string;
    name: string;
    duration: number;
    note?: string;
    index: string;
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [proName, setProName] = useState(name);
    const [proDuration, setProDuration] = useState(duration);
    const [proNote, setProNote] = useState(note ? note : "");

    const deleteHandler = (id: string) => {
        toast.promise(dispatch(deleteProject(id)).unwrap(), {
            success: "Project Deleted",
            error: "Fail to delete project",
            pending: "Processing...",
        });
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(
            dispatch(updateProject({id, name, note, duration})).unwrap(),
            {
                success: "Project Updated",
                error: "Fail to update project",
                pending: "Processing...",
            }
        );
    };

    return (
        <>
            <Accordion className="mb-2">
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md={10}>{name}</Col>
                            <Col md={1}>
                                <CustomToggle eventKey={index}></CustomToggle>
                            </Col>
                            <Col md={1}>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => deleteHandler(id)}
                                >
                                    <FaTrash />
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>
                                                Project Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={proName}
                                                onChange={(e) =>
                                                    setProName(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>
                                                Duration(Months)
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={proDuration}
                                                onChange={(e) => {
                                                    setProDuration(
                                                        parseInt(e.target.value)
                                                    );
                                                    console.log(proDuration);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group>
                                        <Form.Label>
                                            Project Note(Optional)
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={proNote}
                                            as="textarea"
                                            onChange={(e) =>
                                                setProNote(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Row>
                                <Button
                                    type="submit"
                                    variant="success"
                                    className="my-3"
                                >
                                    <FaRegSave />
                                </Button>
                            </Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
};
export default ProjectItem;
