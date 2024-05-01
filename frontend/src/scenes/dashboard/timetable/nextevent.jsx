import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
const NextEvent=({flatEvents})=>{
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    
    const [nextEvent, setNextEvent] = useState(null);
    
    const findNextEvent = (events) => {
        const now = new Date();
        
        const nextEvents = events.filter((event) => {
            // Convert event start time to a Date object
            const eventStart = new Date(event.start);
            // Compare the event start time with the current time
            return eventStart > now;
        });
        
        return nextEvents.length > 0 ? nextEvents[0] : null;
    };

    // Set the next event
    useEffect(() => {
        
        setNextEvent(findNextEvent(flatEvents));
    }, [flatEvents]);

    // Render the next event
   
       

        if (!nextEvent) {
            return <div>No upcoming events</div>;
        } else {
            const nextEventStartTime = new Date(nextEvent.start);
            const nextEventEndTime = new Date(nextEvent.end);
            const startTimeString = nextEventStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const endTimeString = nextEventEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
            return (
                <Box 
                width='80%' 
                margin='20px 10%'  
                display="flex" 
                flexDirection="row" 
                justifyContent="center"  
                backgroundColor={colours.primary[400]} 
                color={colours.grey[100]}
                paddingBottom="20px"
                >
                    <Typography 
                    variant="h2" 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center"
                    marginRight="15px"
                    fontWeight="bold"
                    color={colours.grey[100]}
                    >
                        Next Class:
                    </Typography>
                <Box 
                display="flex" 
                justifyContent="center" 
                flexDirection="column" 
                alignItems="center"
                marginTop="10px"
                >
                    <Typography variant="h2" fontWeight="bold" color={colours.grey[100]}>{startTimeString} - {endTimeString}</Typography>
                    <Typography variant="h2" fontWeight="bold" color={colours.grey[100]}>{nextEvent.title}</Typography>
                </Box>
                </Box>
            );
        }
}

export default NextEvent;