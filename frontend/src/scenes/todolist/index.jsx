import {Box} from "@mui/material";
import Header from "../../components/Header";
import ToDoWrapper from "./todowrapper";
const ToDo=()=>{
    return(
            <Box m="20px"> 
        <Box >
        <Header title="ToDo List" subtitle="View and edit your tasks list"/>
        </Box>
        <Box mt="20px">
        <ToDoWrapper/>
        </Box>

        </Box>
        
    )
}

export default ToDo;