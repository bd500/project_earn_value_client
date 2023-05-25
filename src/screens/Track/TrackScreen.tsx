import {Card, Col, FormGroup, FormSelect, Row} from "react-bootstrap";
import DynamicTable from "../../components/DynamicTable/DynamicTable";
import {useEffect, useState} from "react";
import Meta from "../../components/Meta/Meta";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {getProjects} from "../../store/projectSlice";

const TrackScreen = () => {
    const [projectId, setProject] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const {projects} = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    return (
        <>
            <Meta>Track</Meta>
            <h1>Track On Your Working Project</h1>
            <div className="mb-4">
                <FormGroup>
                    <FormSelect onChange={(e) => setProject(e.target.value)}>
                        <option value={""}>Choose a Project</option>
                        {projects?.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </FormSelect>
                </FormGroup>
            </div>
            <div hidden={projectId ? false : true}>
                <Row>
                    <Col md={4}>
                        <Card body className="mb-4">
                            <Card.Title>
                                <b>Project Note</b>
                            </Card.Title>
                            <Card.Text>This is a note</Card.Text>
                        </Card>
                    </Col>
                </Row>
            </div>
            <h3>Actual Cost For Perform Scheduled</h3>
            <DynamicTable projectId={projectId} />
            <div>
                *The excel file must be in this structure.
                <br /> You can fill in the above table or you download our excel
                template to use :)
            </div>
        </>
    );
};
export default TrackScreen;
