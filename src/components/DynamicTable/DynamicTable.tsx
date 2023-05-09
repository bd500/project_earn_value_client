import {Button, Table} from "react-bootstrap";
import TableRow from "./TableRow";
import {useState} from "react";
import {FiPlus} from "react-icons/fi";

export interface RowData {
    name: string;
    precede: number | string;
    months: number[];
}

const DynamicTable = () => {
    const data: Array<RowData> = [
        {
            name: "ABC",
            precede: 123,
            months: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
        },
        {
            name: "ABC",
            precede: 123,
            months: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
        },
    ];

    const [rowsData, setRowsData] = useState(data);

    const addNewRow = () => {
        const input = {
            name: "--",
            precede: "--",
            months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };

        setRowsData([...rowsData, input]);
    };

    const deleteRow = (rowNum: number) => {
        const newRow = [...rowsData];
        newRow.splice(rowNum, 1);
        setRowsData(newRow);
    };

    const handleMonthsChange = (
        rowNum: number,
        value: number,
        index: number
    ) => {
        const temp = rowsData[rowNum];
        temp.months[index] = value;
        const newRowsData = rowsData.map((row, i) =>
            i === index ? temp : row
        );
        setRowsData(newRowsData);
        console.log(rowsData);
    };

    const handleNameChange = (rowNum: number, value: string) => {
        const temp = rowsData[rowNum];
        temp.name = value;
        const newRowsData = rowsData.map((row, i) =>
            i === rowNum ? temp : row
        );
        setRowsData(newRowsData);
        console.log(rowsData);
    };

    const handlePrecedeChange = (rowNum: number, value: string) => {
        const temp = rowsData[rowNum];
        temp.precede = value;
        const newRowsData = rowsData.map((row, i) =>
            i === rowNum ? temp : row
        );
        setRowsData(newRowsData);
        console.log(rowsData);
    };

    return (
        <>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Precede</th>
                            {Array.from({length: 12}, (item, index) => (
                                <th>{index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow
                            rowData={rowsData}
                            onDelete={deleteRow}
                            handleMonthsChange={handleMonthsChange}
                            handleNameChange={handleNameChange}
                            handlePrecedeChange={handlePrecedeChange}
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
            </div>
        </>
    );
};
export default DynamicTable;
