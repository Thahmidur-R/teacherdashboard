import { useState } from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {Box, IconButton, Typography, useTheme} from '@mui/material';
import {Link} from "react-router-dom"; //allows us to link when we click on navigation item so it takes us to relevant page
import {tokens} from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


const Item=( {title, to, icon, selected, setSelected})=>{
 const theme=useTheme();
 const colours = tokens(theme.palette.mode);
 return(
    <MenuItem 
    style={{color: colours.grey[100]}} 
    active={selected === title}
    onClick={()=>setSelected(title)}
    icon={icon}
    >
        <Typography>{title}</Typography>
        <Link to={to}/>
    </MenuItem>
 )
}

const Sidebar=()=>{
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const  [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return(
        <Box
        sx={{
            "& .pro-sidebar-inner": {
                background: `${colours.primary[400]} !important`
            },
            "& pro-icon-wrapper":{
                backgroundColor: "transparent !important"
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important",
              },
              "& .pro-inner-item:hover": {
                color: "#868dfb !important",
              },
              "& .pro-menu-item.active": {
                color: "#6870fa !important",
              },
        }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape={isCollapsed?"square":undefined}>
                    {/*LOGO and MENU ICON (hamburger) */}
                <MenuItem  
                onClick={()=>setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                  color: colours.grey[100],
                }}
                >
                {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colours.grey[100]} fontWeight="bold">
                  Teacher Dashboard
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
                </MenuItem>


            {/* USER */}
            {!isCollapsed && (
                <Box mb="25px">
                <Box display="flex" justifyContent ="center" alignItems="center">
                    <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/user.png`}
                    style={{ cursor:"pointer", borderRadius: "50%"}}
                
                    />
                </Box>
                <Box textAlign="center">
                    <Typography 
                    variant="h3"
                    color={colours.grey[100]}
                    fontWeight="bold"
                    sx={{m: "10px 0 0 0"}} >
                        Thahmidur Rahman
                    </Typography>
                    <Typography variant="h5" color={colours.greenAccent[500]}>
                        Admin
                    </Typography>
                </Box>
                </Box>
            )}
            {/*Menu Items */}
            
            <Box paddingLeft={isCollapsed? undefined:"10%"}>
                <Item
                title="DashBoard"
                to="/"
                icon={<HomeOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="Classes"
                to="/classes"
                icon={<ClassOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="ToDo List"
                to="/todo"
                icon={<ChecklistIcon/>}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="Contacts Information"
                to="/contacts"
                icon={<ContactsOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="Profile Form"
                to="/form"
                icon={<PersonOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                />
                <Item
                title="Calendar"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                />
            </Box>
            
            </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;