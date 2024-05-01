// need to store tasks states in local storage so it is not lost when page is changed
import {Box, Typography, useTheme} from "@mui/material";
import {tokens} from "../../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const ListItem = ({ tasks, completeTask, setListItemValues, setCompletedItemValues}) => {

const theme=useTheme();
const colours = tokens(theme.palette.mode);

const handleDeleteItem = (indexToRemove) => {
  setListItemValues(tasks.filter((_, index) => index !== indexToRemove));
};
const handleCompleteItem=(indexToAdd)=>{
  const completedItem = {
    name: tasks[indexToAdd].name,
    description: tasks[indexToAdd].description
  };

 setCompletedItemValues((prevCompleteTask) => [...prevCompleteTask, completedItem]);
  setListItemValues(tasks.filter((_, index) => index !== indexToAdd));
 
};
return (
  <Box>
    {tasks.map((item, index) => (
      <Box key={index} display="flex" justifyContent="space-between" mt="20px" sx={{backgroundColor:theme.palette.background.default, padding:"20px"}}>
        <Box>
          <Typography variant="h3" color={colours.grey[100]}>
          {item.name}: {item.description}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" mr={3}>
         
          <DeleteIcon fontSize="large" sx={{ marginRight: '20px',color:colours.grey[100], cursor: 'pointer' }}  onClick={() => handleDeleteItem(index)}  />
          <CheckCircleIcon  fontSize="large" sx={{color:colours.grey[100], cursor: 'pointer' }}  onClick={()=> handleCompleteItem(index)}/>
          
        </Box>
      </Box>
    ))}
  </Box>
);
};

const CompleteListItem=({completeTask, setCompletedItemValues})=>{
  const theme=useTheme();
const colours = tokens(theme.palette.mode);
   
const handleRemoveFromComplete=(indexToRemove)=>{
  setCompletedItemValues(completeTask.filter((_, index) => index !== indexToRemove));
}
  return(
    <Box>
      {completeTask.map((item, index)=>(
        <Box key={index} display="flex" justifyContent="space-between" mt="20px" sx={{backgroundColor:theme.palette.background.default, padding:"20px"}}>
          
            <Typography variant="h3" color={colours.grey[100]} >
          {item.name}: {item.description}
          </Typography>
          
          <Box>
          <DeleteIcon fontSize="large" sx={{ marginRight: '20px',color:colours.grey[100], cursor: 'pointer' }}  onClick={() => handleRemoveFromComplete(index)}  />

          </Box>
        </Box>
      ))}
    </Box>
  )
}

export { ListItem, CompleteListItem };