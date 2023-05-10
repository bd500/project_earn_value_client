import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import data from "../../data/data";

const ParetoChart = () => {
    return (
        <>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey="name" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar dataKey="ac" fill="#8884d8" />
            </BarChart>
        </>
    );
};
export default ParetoChart;
