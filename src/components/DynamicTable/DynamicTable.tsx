import {Button, Table} from "react-bootstrap";
import TableRow from "./TableRow";
import {useEffect, useState} from "react";
import {FiPlus} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {getOneProject, updateProject} from "../../store/projectSlice";
import {FaFileExcel, FaSave} from "react-icons/fa";
import {toast} from "react-toastify";

export interface RowData {
    name: string;
    precede: number | string;
    ac: number[];
    pv: number[];
    progress: number[];
}

const DynamicTable = ({projectId}: {projectId: string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {project} = useSelector((state: RootState) => state.projects);

    const [rowsData, setRowsData] = useState<RowData[]>([]);

    const newCostCol = (duration: number) => {
        return Array.from({length: duration}, (item, index) => 0);
    };

    useEffect(() => {
        if (projectId)
            dispatch(getOneProject(projectId))
                .unwrap()
                .then((payload) => {
                    setRowsData(payload.tasks || []);
                });
    }, [projectId]);

    const addNewRow = () => {
        const input = {
            name: "--",
            precede: "--",
            ac: newCostCol(project.duration || 12),
            pv: newCostCol(project.duration || 12),
            progress: newCostCol(project.duration || 12),
            // ev: newCostCol(project.duration || 12),
        };

        setRowsData([...rowsData, input]);
    };

    const deleteRow = (rowNum: number) => {
        const newRow = [...rowsData];
        newRow.splice(rowNum, 1);
        setRowsData(newRow);
    };

    const handleAcChange = (rowNum: number, value: number, index: number) => {
        setRowsData((prevRowsData) => {
            const newRowsData = [...prevRowsData];
            const row = {...newRowsData[rowNum]};

            const ac = [...row.ac];
            ac[index] = value;
            row.ac = ac;

            newRowsData[rowNum] = row;

            return newRowsData;
        });
        //console.log(rowsData);
    };

    const handlePvChange = (rowNum: number, value: number, index: number) => {
        setRowsData((prevRowsData) => {
            const newRowsData = [...prevRowsData];
            const row = {...newRowsData[rowNum]};

            const pv = [...row.pv];
            pv[index] = value;
            row.pv = pv;
            let sumPV = 0;
            row.pv.forEach((i) => (sumPV += i));
            //row.ev = (row.progress * sumPV) / 100;

            newRowsData[rowNum] = row;

            return newRowsData;
        });
    };

    const handleNameChange = (rowNum: number, value: string) => {
        setRowsData((prevRowsData) => {
            const newRowsData = [...prevRowsData];
            const row = {...newRowsData[rowNum]};
            row.name = value;
            newRowsData[rowNum] = row;

            return newRowsData;
        });
    };

    const handlePrecedeChange = (rowNum: number, value: string) => {
        setRowsData((prevRowsData) => {
            const newRowsData = [...prevRowsData];
            const row = {...newRowsData[rowNum]};
            row.precede = value;
            newRowsData[rowNum] = row;

            return newRowsData;
        });
    };

    const handleProgressChange = (
        rowNum: number,
        value: string,
        index: number
    ) => {
        setRowsData((prevRowsData) => {
            const newRowsData = [...prevRowsData];
            const row = {...newRowsData[rowNum]};
            const progress = [...row.progress];
            progress[index] = parseFloat(value);
            row.progress = progress;
            //let sumEV = 0;
            //row.ev.forEach((i) => sumEV += i);
            newRowsData[rowNum] = row;
            return newRowsData;
        });
    };

    const handleSave = () => {
        toast.promise(
            dispatch(updateProject({id: projectId, tasks: rowsData})).unwrap(),
            {
                success: "Project data has been saved",
                pending: "Processing...",
                error: "Error occurs, please try again!",
            }
        );
    };

    const handleStatus = () => {
        toast.promise(
            dispatch(
                updateProject({
                    id: projectId,
                    status:
                        project.status === "Completed"
                            ? "Ongoing"
                            : "Completed",
                })
            ),
            {
                success: "Grats!!! You finish your project!!!!",
                error: "Error occurs, please try again!",
                pending: "Processing",
            }
        );
    };

    const handleImportExel = () => {};

    return (
        <>
            <div hidden={projectId ? false : true}>
                <Table responsive="md">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Task</th>
                            <th>Pre</th>
                            {/* <th>%</th> */}
                            <th>Type</th>
                            {Array.from(
                                {
                                    length: project.duration || 12,
                                },
                                (item, index) => (
                                    <th>{index + 1}</th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody className="align-middle text-center">
                        <TableRow
                            rowData={rowsData}
                            onDelete={deleteRow}
                            handleAcChange={handleAcChange}
                            handleNameChange={handleNameChange}
                            handlePrecedeChange={handlePrecedeChange}
                            handleProgressChange={handleProgressChange}
                            handlePvChange={handlePvChange}
                            // handleEvChange={handleEvChange}
                        />
                        <tr>
                            <td>
                                <Button
                                    onClick={addNewRow}
                                    variant="outline-success"
                                >
                                    <FiPlus />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <Button variant="success" onClick={handleSave}>
                    <FaSave /> Save
                </Button>
                <Button
                    variant="secondary"
                    className="mx-3"
                    onClick={handleStatus}
                >
                    {project.status === "Completed"
                        ? "Unmark as Completed"
                        : "Mark as Completed"}
                </Button>
                <Button variant="danger" onClick={handleImportExel}>
                    <FaFileExcel /> Import Excel File
                </Button>
            </div>
        </>
    );
};
export default DynamicTable;
