import { useState } from "react";
import {formatDate} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar =()=>{
const theme = useTheme();
const colours = tokens(theme.palette.mode);
const [currentEvents, setCurrentEvents] = useState([]);
const handleDateClick = (selected)=>{
const title = prompt("Please enter a new title for your event");
const calendarAPI = selected.view.calendar;

calendarAPI.unselect();

if(title){
    calendarAPI.addEvent({
        id:`${selected.dateStr}-${title}`,
        title,
        start:selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
    })
}
};

const handleEventClick =(selected)=>{
if(window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)){
    selected.event.remove();
}
};
return(
    <Box m="20px">
        <Header title="CALENDAR" subtitle="Interactive Calendar"/>
        <Box display="flex" justifyContent="space-between">
            {/*CALENDAR SIDEBAR */}
            <Box flex="1 1 20%"
             backgroundColor = {colours.primary[400]}
             padding="15px"
             >
                <Typography variant="h5">Event</Typography>
                <List>
                    {currentEvents.map((event)=>(
                        <ListItem
                        key={event.id}
                        sx={{
                            backgroundColor: colours.greenAccent[500],
                            margin:"10px 0",
                            borderRadius:"2px"
                        }}
                        >
                           <ListItemText 
                           primary={event.title}
                           secondary={
                            <Typography>
                                {formatDate(event.start,{
                                    year:"numeric",
                                    month:"short",
                                    day:"numeric",
                                })}
                            </Typography>
                           }
                           />
                               


                        </ListItem>
                    ))}
                </List>

            </Box>
            {/*CALENDAR */}
            <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                    height="75vh"
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    headerToolbar={{
                        left: "prev,next,today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={(event)=>{setCurrentEvents(event)}}
                    initialEvents={[
                        {id:"1233", title: "Museum Trip", date:"2024-04-29"},
                        {id:"1234", title: "After School club", date:"2024-05-01T16:00:00", end: "2024-05-01T17:00:00"},
                        {id:"1235", title: "After School club", date:"2024-05-08T16:00:00", end:"2024-05-08T17:00:00"},
                        {id:"1236", title: "After School club", date:"2024-05-15T16:00:00", end:"2024-05-15T17:00:00"},
                        {id:"1237", title: "After School club", date:"2024-05-22T16:00:00", end:"2024-05-22T17:00:00"},

                    ]}  
                    />
            </Box>
        </Box>
    </Box>
)
}

export default Calendar