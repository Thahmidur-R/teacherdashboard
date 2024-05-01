import { ColourModeContext, useMode } from "./theme";
//CssBaseline resets css to the defaults we'll probalby need
//themeprovider gives ability to pass on the themes to material ui
import { CssBaseline, ThemeProvider } from "@mui/material"; 
import {Routes, Route} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ToDo from "./scenes/todolist";
import ClassPage from "./scenes/classes";


import Calendar from "./scenes/calendar";
/*
import Contacts from "./scenes/contacts";
import Dashboard from "./scenes/dashboard";
import Form from "./scenes/form";

import Dashboard from "./scenes/dashboard";
import Dashboard from "./scenes/dashboard";
import Dashboard from "./scenes/dashboard";
*/


function App() {
const [theme, colourMode] = useMode();

  return (
    <ColourModeContext.Provider value = {colourMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className="app">
      <Sidebar/>
     <main className="content">
      <Topbar/>
      <Routes>
      <Route path="/" element={<Dashboard />} />

  <Route path="/classes" element={<ClassPage />} />


   <Route path="/todo" element={<ToDo />} />


  <Route path="/calendar" element={<Calendar />} />

{
  // <Route path="/contacts" element={<Contacts />} />
}
{
  // <Route path="/form" element={<Form />} />
}
      </Routes>
     </main>
    </div>
    </ThemeProvider>
    </ColourModeContext.Provider>
  );
}

export default App;
