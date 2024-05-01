import { DataGrid } from "@mui/x-data-grid"
import {Box, useTheme} from "@mui/material";
import {tokens} from "../../theme";
  
    // Columns for the DataGrid
    const columns = [
      { field: 'id', headerName: 'Student ID', flex: 1 },
      { field: 'first_name', headerName: 'First Name', flex: 1, cellClassName:"name-column--cell" },
      { field: 'last_name', headerName: 'Last Name', flex: 1, cellClassName:"name-column--cell" },
      { field: 'attendance', headerName: 'Attendance %', flex: 1 },
      
      { field: 'autumn_score', headerName: 'Autumn score', flex: 1 },
      
      { field: 'spring_score', headerName: 'Spring score',flex: 1 },
      
      { field: 'summer_score', headerName: 'Summer score',flex: 1 },
     
    ];

const StudentTable=({isGridVisible, classStudentsInfo})=>{
  const theme = useTheme();
  const colours = tokens(theme.palette.mode);
    
     const rowsWithId = classStudentsInfo.map((student, index) => ({
      id: student.student_id, // Use student_id as id
      ...student,
    }));
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
        {!isGridVisible && classStudentsInfo && (
        <DataGrid
        rows={rowsWithId}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        
      />
    )
      }
      </Box>
    )

}
export default StudentTable;