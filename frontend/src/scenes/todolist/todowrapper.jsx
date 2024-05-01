import {Box, Typography, useTheme, TextField, Button} from "@mui/material";
import {ListItem,CompleteListItem} from './listitem';
import {tokens} from "../../theme";
import { useState } from "react";

const ToDoWrapper =()=>{
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [listItemValues, setListItemValues] = useState([]);
    const [listTab, setListTab] = useState("Incomplete");
    const [completedItemValues, setCompletedItemValues]=useState([]);


    const handleNameChange = (event) => {
        setNameValue(event.target.value);
      };
    
      const handleDescriptionChange = (event) => {
        setDescriptionValue(event.target.value);
      };


    const handleButtonClick = () => {
        setListItemValues([...listItemValues, { name: nameValue, description: descriptionValue }]);
        setNameValue('');
        setDescriptionValue('');
      };

      const handleCompleteButtonClick=()=>{
        setListTab("Complete");
    
      }
      const handleIncompleteButtonClick=()=>{
        setListTab("Incomplete");
      }
    return(
        <Box display="flex" justifyContent="center">
        <Box 
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column" 
        backgroundColor={colours.primary[400]} 
        width="fit-content"  
        p={2}>
            {/*ADD TASK SECTION */}
            <Box  display="flex" justifyContent="space-between">
                <Box display="flex" marginRight="20px" >
                <TextField 
                label="Task Name" 
                variant="outlined" 
                value={nameValue} 
                onChange={handleNameChange}

                InputLabelProps={{style : {color : colours.primary[200]} }}
                sx={{
                     "& .MuiOutlinedInput-root": {
                       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                         borderColor: colours.primary[200], // Change border color when focused
                       },
                       
                     },
                   }}
                />

                   {/* <input type="text" placeholder="Task name"/>*/}
                </Box>
                <Box marginRight="20px" >
                <TextField 
                label="Task Description"
                variant="outlined" 
                InputLabelProps={{style : {color : colours.primary[200]} }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: colours.primary[200], // Change border color when focused
                      },
                      
                    },
                  }}
                  value={descriptionValue} 
                  onChange={handleDescriptionChange}
                />
                   {/* <input type="text" placeholder="Task Description"/>*/}
                </Box>
                <Box display="flex" alignItems="center">
                    
                <Button 
                
                type="button"
                onClick={handleButtonClick}
                
                sx={{ background:colours.greenAccent[400],
                    borderRadius: 3,
                    border: 0,
                    color: "white",
                    height: 48,
                    padding: "0 30px",
                    "&:hover": {
                        background: colours.greenAccent[700],
                    },
                    
      }}>
                    <Typography variant="h5" color={colours.primary[500]} fontWeight="bold">
                        Add
                        </Typography>
                        </Button>
                </Box>
            </Box>
            {/*TODO and COMPLETED SECTION */}
            <Box display="flex" p={5}  >
            <Button 
            onClick={handleIncompleteButtonClick}
            type="button"
            
            sx={{
              backgroundColor: listTab === "Incomplete" ? colours.greenAccent[400] : colours.primary[400],
                 
                 "&:hover": {
                    background: colours.primary[300],
                    color: colours.primary[700],
                  },
                 }}>
            <Typography 
            variant="h5" 
            
            fontWeight="bold" 
            sx={{
              color:listTab === "Incomplete" ? colours.primary[600] : colours.primary[200],
              "&:hover": {
                    color: colours.primary[700],
                  },}}>
                        Incomplete
                    </Typography>
            </Button>
            <Button 
            onClick={handleCompleteButtonClick}
            type="button"
            sx={{ 
              backgroundColor: listTab === "Complete" ? colours.greenAccent[400] : colours.primary[400],
              "&:hover": {
                background: colours.primary[300],
                color: colours.primary[700],
              },
              
                }}>
            <Typography 
            variant="h5"
            sx={{ 
            color:listTab === "Complete" ? colours.primary[600] : colours.primary[200],
            "&:hover": {
              color: colours.primary[700],
            },
            }}
            fontWeight="bold">
                        Completed
                    </Typography>
            </Button>
            </Box>
            {/*TASK LIST */}
            <Box
             
             width="100%"
             display="flex"
             flexDirection="column "
             
             >
                
                {listTab === 'Complete' ? (
      <CompleteListItem
       completeTask={completedItemValues} 
       setCompletedItemValues={setCompletedItemValues}
       
       />
    ) : (
      <ListItem 
      tasks={listItemValues}
      setListItemValues={setListItemValues} 
      setCompletedItemValues={setCompletedItemValues} 
      completeTask={completedItemValues}
      
       
      />
    )}
            </Box>
        </Box>
        </Box>
    )
}

export default ToDoWrapper;