import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

function App() {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        axios.get("http://localhost:5000/sales")
            .then((response) => {
                const data = response.data;
                setChartData({
                    labels: data.map((item) => item.product),
                    datasets: [
                        {
                            label: "Sales Quantity",
                            data: data.map((item) => item.quantity),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                        },
                    ],
                });
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div style={{ width: "600px", margin: "50px auto" }}>
            <h2>Sales Data</h2>
            <Bar data={chartData} />
        </div>
    );
}

export default App;
