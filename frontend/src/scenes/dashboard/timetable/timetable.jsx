

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";

import {
    Box,
    Typography,
    useTheme
} from "@mui/material";
import { tokens } from "../../../theme";
import generateTimetable from "./timetableUtils";
import NextEvent from "./nextevent";

const TimeTable =()=>{
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
   
    
        const schoolYearTimetable = generateTimetable(10);
        
    const flattenTimetable = (timetable) => {
        const flatEvents = [];
        timetable.forEach((week) => {
            week.forEach((day) => {
                day.events.forEach((event) => {
                    flatEvents.push({
                        title: event.title,
                        start: `${day.date.toISOString().split('T')[0]}T${event.startTime}`,
                        end: `${day.date.toISOString().split('T')[0]}T${event.endTime}`
                    });
                });
            });
        });
        return flatEvents;
    };

        const flatEvents = flattenTimetable(schoolYearTimetable);
        const renderEventContent = (eventInfo) => {
            const { event } = eventInfo;
        
            return (
                <div
                    style={{
                       
                        fontWeight: 'bold', 
                        fontFamily: 'Arial, sans-serif', 
                        textAlign: 'center',
                        display: 'flex', 
                        height: '100%',
                        alignItems:'center', 
                        justifyContent:"center",
                        flexDirection:"column"
                    }}
                >
                <div>{event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div>{event.title}</div>
                </div>
            );
        };
    
      

    return(
        <>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
            left: 'prev,next,today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay',
        }}
        events={flatEvents}
        editable={true} // Allow drag and drop to change events
        selectable={true} // Allow selection of empty cells to create new events
        weekends={false} 
        slotMinTime="09:00:00"
        slotMaxTime="17:00:00"
        eventColor={colours.greenAccent[500]}
        eventContent={renderEventContent}
        
        />
        <NextEvent flatEvents={flatEvents}/>
      
        </>

    )


}

export default TimeTable