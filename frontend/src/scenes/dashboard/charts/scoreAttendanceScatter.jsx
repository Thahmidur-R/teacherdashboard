
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {useTheme} from "@mui/material";
import { tokens } from "../../../theme";


const ScoreAttendanceScatter = ({ data }) => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    // Extracting data
   const attendanceData = data.map(e=>e.attendance);
   const scoreData = data.map(e=>e.summer_score);

    // Creating dataset
    const dataset = {
        labels: 'Score vs Attendance',
        datasets: [{
            label: 'Score vs Attendance',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointStyle: 'circle', // Set the point style to 'circle'
            pointRadius: 4,
            data: scoreData.map((score, index) => ({ x: score, y: attendanceData[index] }))
        }]
    };

    // Options for the scatter graph
    const options = {
        scales: {
            x: {
                grid: {
                    color: colours.grey[200]
                },
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Score'
                }
            },
            y: {
                grid: {
                    color: colours.grey[200]
                },
                beginAtZero: false,
                min:80,
                title: {
                    display: true,
                    text: 'Attendance (%)'
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: (context) => {
                        const studentFirstName = data[context[0].dataIndex].first_name;
                        const studentLastName = data[context[0].dataIndex].last_name; 

                        return studentFirstName + " "+ studentLastName; 
                    },
                    label: (context) => {
                        const dataPoint = context.dataset.data[context.dataIndex];
                        return `Score: ${dataPoint.x}, Attendance: ${dataPoint.y}`;
                    }
                }
            }
        }
    };

    return <Scatter data={dataset} options={options} />;
};

export default ScoreAttendanceScatter;
