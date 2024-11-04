import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineChartComponent({ data }) {
  // console.log("data:" ,data);

  return (
    <ResponsiveContainer>
      <LineChart data={data} width="100%" height="250px">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5000]} /> {/* Set Y-axis range from 0 to 5000 */}
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
        <Line type="monotone" dataKey="sale" stroke="#ff6384" />
      </LineChart>
    </ResponsiveContainer>
  );
}
