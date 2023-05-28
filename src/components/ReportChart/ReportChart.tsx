import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    Label,
} from "recharts";
import FileSaver from "file-saver";
import {useCallback} from "react";
import {useCurrentPng} from "recharts-to-png";
import {Button} from "react-bootstrap";
import * as XLSX from "xlsx";

interface ReportChartProps {
    ac: number[];
    ev: number[];
    pv: number[];
}

const ReportChart = ({ac, ev, pv}: ReportChartProps) => {
    const [getPng, {ref, isLoading}] = useCurrentPng();

    // Can also pass in options for html2canvas
    // const [getPng, {ref}] = useCurrentPng({backgroundColor: "#000"});

    const handleDownload = useCallback(async () => {
        const png = await getPng();

        // Verify that png is not undefined
        if (png) {
            // Download with FileSaver
            FileSaver.saveAs(png, "myChart.png");
        }
    }, [getPng]);

    const reportData = [{}];

    const getData = () => {
        reportData.pop();
        for (let i = 0; i < pv.length; i++) {
            const value = {
                name: (i + 1).toString(),
                ac: ac[i],
                pv: pv[i],
                ev: ev[i],
            };
            reportData.push({...value});
        }
    };

    getData();
    // console.log(reportData);

    /*
        ac: 8884d8
        pv: 82ca9d
        ev: cd071e
    */

    return (
        <>
            <h3>Earned Value Analysis</h3>
            <LineChart data={reportData} width={730} height={250} ref={ref}>
                <CartesianGrid strokeDasharray={"4 2"} />
                <XAxis dataKey={"name"}>
                    <Label
                        value="(Month)"
                        offset={0}
                        position="insideBottomRight"
                        dy={20}
                    />
                </XAxis>
                <YAxis>
                    <Label
                        value="($)"
                        offset={0}
                        position="insideTopLeft"
                        dx={-5}
                    />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="ac"
                    stroke="#5353ec"
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#00a300"
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    dataKey="ev"
                    stroke="#ea3c53"
                    strokeWidth={2}
                />
            </LineChart>
            <Button
                variant="danger"
                disabled={isLoading}
                onClick={handleDownload}
                className="my-3"
            >
                Export To Excel
            </Button>
        </>
    );
};
export default ReportChart;
