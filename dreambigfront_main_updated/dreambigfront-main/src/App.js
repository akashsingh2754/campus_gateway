import './App.css';
import './index.css'
import Navigation from './components/Header';
import React, {createContext , useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Landing from "./screens/Landing/Landing"
import AdminLogin from './screens/Login/AdminLogin';
import StudentLogin from './screens/Login/StudentLogin';
import Main from "./screens/Quiz/Main";
import Crowdfunding from './screens/User/Crowdfunding';
import Guide from './components/Guide';
import Displaycards from './screens/Finance/displaycards';
import Payment from './screens/PaymentPortal/PaymentMain';
import Portal from './screens/PaymentPortal/Portal';
// import VC from './screens/User/VC';
import Course from './screens/course/course';
import Jobs from './recruit/components/Jobs';
import DisplaycardsB from './screens/business/displaycards';
import Admin from './screens/Admin/Admin';
import AdminSignup from './screens/Signup/AdminSignUp';
import StudentSignup from './screens/Signup/StudentSignup';
import Student from './screens/Student/Student';
import Chat from './screens/Chat/Chat';
import Productform from './components/Form';
import Quiz from './screens/Quiz/quiz';
import InterviewApp from './screens/Interview/InterviewApp';
import { SocketContextProvider } from './store/SocketContext';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `'Roboto Mono', monospace`,
      fontWeightLight: 400,
      fontWeightRegular: 600,
      fontWeightMedium: 900,
    },
  },
})

export const UserContext = createContext(null)




function App() {
  const [user, setUser] = useState({
    username: "",
    id: "",
    email: "",
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ user, setUser }}>
          <Navigation />
          <div style={{ marginTop: "75px" }}>
            <Routes>
              <Route exact path='/' element={<Landing />} />
              <Route exact path='Mentorship' element={<Course />} />
              <Route path='adminsignup' element={<AdminSignup />} />
              <Route path='studentlogin' element={<StudentLogin />} />
              <Route path='adminlogin' element={<AdminLogin />} />
              <Route path='studentsignup' element={<StudentSignup />} />
              <Route path='student' element={<Student/>} />
              <Route path='business' element={<DisplaycardsB />} />
              <Route path='admin' element={< Admin/>}/>
              <Route path='guide' element={<Guide />} />
              <Route path='jobportal' element={<Jobs />} />
              <Route path='payment' element={<Payment/>} />
              <Route path='finance' element={<Displaycards />} />
              <Route path='crowdfunding' element={<Crowdfunding />} />
              <Route path='chat' element={<Chat />} />
              <Route path='form' element={<Productform />} />
              <Route path='main' element={<Main />} />
              <Route path='quiz' element={<Quiz />} />
              <Route path='portal' element={<Portal />} />
              <Route path='interview' element={<SocketContextProvider><InterviewApp /></SocketContextProvider>} />
            </Routes>
          </div>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  )
}


export default App;
