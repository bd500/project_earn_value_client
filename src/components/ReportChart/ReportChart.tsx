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
import data from "../../data/data";

const ReportChart = () => {
    return (
        <>
            <h5>Biểu đồ tổng hợp BCWS-ACWP-BCWP</h5>
            <LineChart data={data} width={730} height={250}>
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
        </>
    );
};
export default ReportChart;
