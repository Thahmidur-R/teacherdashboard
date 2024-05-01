import { ColourModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material"; 
import {Routes, Route} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import ToDo from "./scenes/todolist";
import ClassPage from "./scenes/classes";


import Calendar from "./scenes/calendar";



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

      </Routes>
     </main>
    </div>
    </ThemeProvider>
    </ColourModeContext.Provider>
  );
}

export default App;
