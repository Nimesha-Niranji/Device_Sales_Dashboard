import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import "./App.css";  // Import CSS for styling
import laptopImg from "./images/laptop.jpg";  // Add images
import phoneImg from "./images/phone.jpg";
import tabletImg from "./images/tablet.jpg";

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
                            backgroundColor: ["#4CAF50", "#36A2EB", "#FFCE56"], // Colorful bars
                        },
                    ],
                });
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            <h1 className="title">Smart Device Sales Chart 📊</h1>
            <div className="image-container">
                <img src={laptopImg} alt="Laptop" />
                <img src={phoneImg} alt="Phone" />
                <img src={tabletImg} alt="Tablet" />
            </div>
            <div className="chart-container">
                <Bar data={chartData} />
            </div>
        </div>
    );
}

export default App;
