import { useState, useEffect } from "react";
import {Box, Typography, useTheme} from "@mui/material";
import Header from "../../components/Header";

import {tokens} from "../../theme";
import StudentTable from "./studenttable";
import ClassTable from "./classtable";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const ClassPage=()=>{
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [isGridVisible, setIsGridVisible] = useState(true);
  
    const [teacherClassesInfo, setTeacherClassesInfo] = useState([]);
    const [classStudentsInfo, setClassStudentsInfo] = useState([]);

    useEffect(() => {
      fetch('http://localhost:8081/classes')
        .then(response => response.json())
        .then(data => {
          
          setTeacherClassesInfo(data);
        })
        .catch(error => {
          console.error('Error fetching class information:', error);
        });
    }, []);
    function changeTableVisibility(){
      
      setIsGridVisible(!isGridVisible);
      
     
    }
    

return(
    <Box m="20px"> 
    <Box >
    <Header title="Classes List" subtitle="View your classes"/>
    {
      !isGridVisible &&(
      
        
        <Typography 
        
        variant="h6" 
        color={colours.greenAccent[400]} 
        onClick={changeTableVisibility}
        sx={{
          cursor:"pointer",
          paddingTop:"20px",
          display: "flex",
        alignItems: "center" 
        }}
         
         >
          <ArrowBackIcon sx={{display: "inline"}}/> 
        <p style={{marginBottom: "12px", display: "inline"}}> View classes table </p>
        </Typography>
        
      )
    }
    </Box>
    <Box mt="20px">
        <ClassTable
         isGridVisible={isGridVisible}
          changeTableVisibility={changeTableVisibility} 
      
          teacherClassesInfo={teacherClassesInfo}
          setClassStudentsInfo={setClassStudentsInfo}
          />
        <StudentTable isGridVisible={isGridVisible}   classStudentsInfo={classStudentsInfo}/>
    </Box>
    </Box>
)
}

export default ClassPage;