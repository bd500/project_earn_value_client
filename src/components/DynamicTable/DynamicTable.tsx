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
    progress: number;
}

const DynamicTable = ({projectId}: {projectId: string}) => {
    const dispatch = useDispatch<AppDispatch>();
    const {project} = useSelector((state: RootState) => state.projects);

    // const data: Array<RowData> = [
    //     {
    //         name: "--",
    //         precede: "--",
    //         ac: Array.from(
    //             {length: project.duration || 12},
    //             (item, index) => 0
    //         ),
    //         pv: Array.from(
    //             {length: project.duration || 12},
    //             (item, index) => 0
    //         ),
    //         progress: 0,
    //     },
    // ];

    const [rowsData, setRowsData] = useState<RowData[]>([]);

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
            ac: Array.from(
                {length: project.duration || 12},
                (item, index) => 0
            ),
            pv: Array.from(
                {length: project.duration || 12},
                (item, index) => 0
            ),
            progress: 0,
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
        // const temp = rowsData[rowNum];

        // temp.pv[index] = value;
        // const newRowsData = rowsData.map((row, i) =>
        //     i === rowNum ? temp : row
        // );
        // setRowsData(newRowsData);

        setRowsData((prevRowsData) => {
            const newRowsData = [...prevRowsData];
            const row = {...newRowsData[rowNum]};

            const pv = [...row.pv];
            pv[index] = value;
            row.pv = pv;

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

    const handleProgressChange = (rowNum: number, value: string) => {
        setRowsData((prevRowsData) => {
            const newRowsData = [...prevRowsData];
            const row = {...newRowsData[rowNum]};
            row.progress = parseFloat(value);
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
                            <th>%</th>
                            <th>Cost</th>
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
