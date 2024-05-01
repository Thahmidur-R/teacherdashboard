import { DataGrid } from "@mui/x-data-grid"
import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
  const columns = [

    { field: 'class_id', headerName: 'Class ID', flex: 1 },
    { field: 'class_name', headerName: 'Class Name', flex: 1, cellClassName: "name-column--cell" },
    
    { field: 'num_students', headerName: 'Number of Students', flex: 1 },
    // Add more columns as needed
  ];
 

const ClassTable=({isGridVisible,changeTableVisibility, teacherClassesInfo, setClassStudentsInfo})=>{
  const theme = useTheme();
    const colours = tokens(theme.palette.mode);
  const handleRowClick = (row) => {
    // Extract the className from the clicked row
    const classId = row.row.class_id;
    

    // Make a request to fetch scores for the selected class
    fetch(`http://localhost:8081/classes/${classId}`)
        .then(response => response.json())
        .then(data => {
            setClassStudentsInfo(data);
        })
        .catch(error => {
            console.error('Error fetching scores:', error);
        });
    
    changeTableVisibility();
   
  };

    return(
      <Box
      sx={{
        "& .MuiDataGrid-root":{
          border:"none",
        },
        "& .MuiDataGrid-cell":{
          borderBottom:"none",
        },
        "& .name-column--cell":{
          color: colours.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders":{
          backgroundColor: colours.blueAccent[700],
          borderBottom:"none",
        },
        "& .MuiDataGrid-virtualScroller":{
          backgroundColor: colours.primary[400],
        },
        "& .MuiDataGrid-footerContainer":{
          backgroundColor: colours.blueAccent[700],
          borderTop:"none",
        }
      }}
      >
      {isGridVisible &&(
        <DataGrid
        
        rows = {teacherClassesInfo.map((item, index) => ({ id: index + 1, ...item }))}
        columns={columns}
    pageSize={5}
    onRowClick={handleRowClick}
    />
        
        
      )
}
</Box>
    )

}
export default ClassTable