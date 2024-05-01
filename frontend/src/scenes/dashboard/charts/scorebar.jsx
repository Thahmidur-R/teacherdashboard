import React from 'react';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart } from "chart.js/auto";
import {useTheme} from "@mui/material";
import { tokens } from "../../../theme";
Chart.register(CategoryScale);
const ScoresBar = ({ data }) => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const chartData = {
        labels: data.scoreRanges,
        datasets: [
            {
                label: 'Autumn Scores',
                backgroundColor: colours.redAccent[500],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
                hoverBorderColor: 'rgba(255, 99, 132, 1)',
                data: data.autumnScores
            },
            {
                label: 'Spring Scores',
                backgroundColor: colours.blueAccent[500],
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: data.springScores
            },
            {
                label: 'Summer Scores',
                backgroundColor: colours.greenAccent[500],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: data.summerScores
            }
        ]
    };
console.log(chartData)
    const options = {
        scales: {
            x: { grid: {
                color: colours.grey[400]
            },
                type: 'category',
                title: {
                    display: true,
                    text: 'Score'
                },
                labels: data.scoreRanges
            },
            y: { grid: {
                color: colours.grey[400],
                
            },
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Students'
                },
                ticks: {
                    precision: 0
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default ScoresBar;