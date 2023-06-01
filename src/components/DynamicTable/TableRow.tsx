import {Button, FormControl} from "react-bootstrap";
import {RowData} from "./DynamicTable";
import {FaTrash} from "react-icons/fa";

interface TableRowProps {
    rowData: RowData[];
    onDelete: (rowNum: number) => void;
    handleAcChange: (rowNum: number, value: number, index: number) => void;
    handlePvChange: (rowNum: number, value: number, index: number) => void;
    handleNameChange: (rowNum: number, value: string) => void;
    handlePrecedeChange: (rowNum: number, value: string) => void;
    handleProgressChange: (
        rowNum: number,
        value: string,
        index: number
    ) => void;
    // handleEvChange: (rowNum: number, value: number, index: number) => void;
}

const TableRow = ({
    rowData,
    onDelete,
    handleAcChange,
    handlePvChange,
    handleNameChange,
    handlePrecedeChange,
    handleProgressChange,
}: // handleEvChange,
TableRowProps) => {
    return (
        <>
            {rowData.map((row, rowNum) => (
                <tr className="flex-row align-items-center">
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

                    <td>
                        <div style={{color: "red", textDecoration: "bold"}}>
                            AC
                        </div>
                        <div style={{color: "blue", textDecoration: "bold"}}>
                            PV
                        </div>
                        <div style={{color: "green", textDecoration: "bold"}}>
                            %
                        </div>
                    </td>
                    {row.ac.map((item, index) => (
                        <td key={index}>
                            <div>
                                <FormControl
                                    value={item}
                                    onChange={(e) =>
                                        handleAcChange(
                                            rowNum,
                                            parseInt(e.target.value),
                                            index
                                        )
                                    }
                                    type="number"
                                    size="sm"
                                />
                            </div>
                            <div>
                                <FormControl
                                    value={row.pv[index]}
                                    onChange={(e) =>
                                        handlePvChange(
                                            rowNum,
                                            parseInt(e.target.value),
                                            index
                                        )
                                    }
                                    type="number"
                                    size="sm"
                                />
                            </div>
                            <div>
                                <FormControl
                                    value={row.progress[index]}
                                    onChange={(e) =>
                                        handleProgressChange(
                                            rowNum,
                                            e.target.value,
                                            index
                                        )
                                    }
                                    type="number"
                                    size="sm"
                                    isInvalid={
                                        row.progress[index] > 100 ||
                                        row.progress[index] < 0
                                    }
                                />
                            </div>
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
