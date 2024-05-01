import { useState, useEffect } from "react";
import {Box} from "@mui/material";
import Header from "../../components/Header";
import TimeTable from "./timetable/timetable";
import ChartSection from "./charts/chartSection";
const Dashboard=()=>{
const [viewClass, setViewClass]=useState(0);
const [classNames, setClassNames] = useState([]);
const [classInfo, setClassStudentsInfo] = useState([]);
useEffect(() => {
 
    // Fetch class data from the server
    fetch('http://localhost:8081/classdropdown') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json();
        })
        .then(data => {
           
            setClassNames(data);
        })
        .catch(error => {
            console.error('Error fetching data from server:', error);
        });
}, []);

const handleDropDownSelection = (event) => {
    const classId = event.target.value;
    fetch(`http://localhost:8081/classes/${classId}`)
        .then(response => response.json())
        .then(data => {
            setClassStudentsInfo(data);
           
        })
        .catch(error => {
            console.error('Error fetching scores:', error);
        });

    setViewClass(classId);
      
    
};
    return(
        <Box m="20px"> 
        <Box>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
            {/*TIMETABLE IN DASHBOARD */}
            <Box width="30vw" height="50vh" marginTop="10px" marginRight="40px">
            <TimeTable  />
            </Box>
            {/*CHART SECTION */}
            <Box  width="40vw" marginLeft="40px">
        <ChartSection classNames={classNames} viewClass={viewClass} handleDropDownSelection={handleDropDownSelection} classInfo={classInfo} />
            </Box>
        </Box>
        </Box>
    )
}

export default Dashboard;