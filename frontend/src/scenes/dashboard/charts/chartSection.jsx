import { useState } from "react";
import {Box, Typography, useTheme, FormControl, InputLabel, Select, Menu, MenuItem, Button} from "@mui/material";
import { tokens } from "../../../theme";
import Chart from "./chart";
const ChartSection =({classNames, viewClass, handleDropDownSelection, classInfo})=>{
    const [chartType, setChartType] = useState(null)
    const handleChartSelection = (type) =>{
        setChartType(type);
    }
   

    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    return(
<Box display="flex" flexDirection="column" >
    {/*TOGGLE GRAPH BUTTONS */}
<Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="40px">
    <Box backgroundColor={colours.primary[400]}>
<FormControl width="30%" >
                <InputLabel id="class-dropdown-label">Select Class</InputLabel>
                <Select
                    labelId="class-dropdown-label"
                    id="class-dropdown"
                    value={viewClass}
                    onChange={handleDropDownSelection}
                >
                    <MenuItem value={0}>Select Class</MenuItem>
                    {classNames.map((classNames, index) => (
                        <MenuItem key={classNames.class_id} value={classNames.class_id}>{classNames.class_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Box>
            <Box display="flex" backgroundColor={colours.primary[400]}  >
                <Button onClick={() => handleChartSelection("scores")} variant="outlined" style={{color:colours.grey[100]}}>Scores</Button>
                
                <Button onClick={() => handleChartSelection("scoreAttendance")} variant="outlined" style={{color:colours.grey[100]}}>Scores against Attendance</Button>

            </Box>

</Box>
{/*CHART */}
{(chartType && classInfo.length>2) &&(
<Chart classInfo={classInfo} chartType={chartType} />
)
}

</Box>

)
}

export default ChartSection