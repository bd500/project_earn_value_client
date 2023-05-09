import {Button, FormControl} from "react-bootstrap";
import {RowData} from "./DynamicTable";
import {FaTrash} from "react-icons/fa";

interface TableRowProps {
    rowData: RowData[];
    onDelete: (rowNum: number) => void;
    handleMonthsChange: (rowNum: number, value: number, index: number) => void;
    handleNameChange: (rowNum: number, value: string) => void;
    handlePrecedeChange: (rowNum: number, value: string) => void;
}

const TableRow = ({
    rowData,
    onDelete,
    handleMonthsChange,
    handleNameChange,
    handlePrecedeChange,
}: TableRowProps) => {
    return (
        <>
            {rowData.map((row, rowNum) => (
                <tr>
                    <td>{rowNum + 1}</td>
                    <td>
                        <FormControl
                            value={row.name}
                            onChange={(e) =>
                                handleNameChange(rowNum, e.target.value)
                            }
                        />
                    </td>
                    <td>
                        <FormControl
                            value={row.precede}
                            onChange={(e) =>
                                handlePrecedeChange(rowNum, e.target.value)
                            }
                        />
                    </td>
                    {row.months.map((item, index) => (
                        <td>
                            <FormControl
                                value={item}
                                onChange={(e) =>
                                    handleMonthsChange(
                                        rowNum,
                                        parseInt(e.target.value),
                                        index
                                    )
                                }
                                type="number"
                                size="sm"
                            />
                        </td>
                    ))}
                    <td>
                        <Button
                            variant="outline-danger"
                            onClick={() => onDelete(rowNum)}
                        >
                            <FaTrash />
                        </Button>
                    </td>
                </tr>
            ))}
        </>
    );
};
export default TableRow;
