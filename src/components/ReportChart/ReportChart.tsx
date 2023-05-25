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

interface ReportChartProps {
    data: any;
}

const ReportChart = ({data}: ReportChartProps) => {
    const [getPng, {ref, isLoading}] = useCurrentPng();

    // Can also pass in options for html2canvas
    // const [getPng, { ref }] = useCurrentPng({ backgroundColor: '#000' });

    const handleDownload = useCallback(async () => {
        const png = await getPng();

        // Verify that png is not undefined
        if (png) {
            // Download with FileSaver
            FileSaver.saveAs(png, "myChart.png");
        }
    }, [getPng]);

    return (
        <>
            <h3>Earned Value Analysis</h3>
            <LineChart data={data} width={730} height={250} ref={ref}>
                <CartesianGrid strokeDasharray={"4 2"} />
                <XAxis dataKey={"name"}>
                    <Label value="(Month)" offset={0} position="centerBottom" />
                </XAxis>
                <YAxis>
                    <Label value="($)" offset={0} position="insideTopLeft" />
                </YAxis>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ac" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                <Line type="monotone" dataKey="ev" stroke="#cd071e" />
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
