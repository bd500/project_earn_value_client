import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import data from "../../data/data";

interface ParetoChartProps {
    data: any;
}

const ParetoChart = ({data}: ParetoChartProps) => {
    return (
        <>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey="name">
                    <Label value="(Month)" offset={0} position="centerBottom" />
                </XAxis>
                <YAxis>
                    <Label value="($)" offset={0} position="insideTopLeft" />
                </YAxis>
                <Legend />
                <Tooltip />
                <Bar dataKey="ac" fill="#8884d8" />
            </BarChart>
        </>
    );
};
export default ParetoChart;
