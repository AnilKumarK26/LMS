import {Component} from "react"
import { BrowserRouter,Route,Routes } from "react-router-dom";
//import ResetPassword from "./components/ResetPassword"
import Courses from "./components/courses"
import Services from "./components/ourServices"
import ContactUs from "./components/ContactUs"

//import PasswordGeneration from "./components/PasswordGeneration"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import PythonCourses from "./components/PythonCourses";
import MachineLearningCourses from "./components/MachineLearningCourses";
import CPPCourses from "./components/CPPCourses";
import JavaScriptCourses from "./components/JavaScriptCourses";
import Quizzes from "./components/QuizPage";
import PythonQuizApp from "./components/PythonQuiz";
import MachineLearningQuizApp from "./components/MachineLearningQuiz";
import JavaScriptQuizApp from "./components/JavaScriptQuiz";
import CPPQuizApp from "./components/CPPQuiz";
import PythonExamDashboard from "./components/PythonProgress";
import MachineLearningExamDashboard from "./components/MachineLearningProgress";
import CPPExamDashboard from "./components/CPPProgress";
import JavaScriptExamDashboard from "./components/JavaScriptProgress";
//import QuizReview from "./components/PythonQuizReview";
import ReactQuizApp from "./components/ReactQuiz";
import ReactExamDashboard from "./components/ReactProgress";
import Progress from "./components/ProgressPage";
import ReactContent from "./components/ReactContent";
import NoteForm from "./components/NotesForm";
import NotesList from "./components/NotesList";
import NoteDetails from "./components/NotesDetails";
import CollaborativeLearning from "./components/CollaborativeLearning";
import ForgotPassword from "./components/ForgotPassword";



class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/contact-us" element = {<ContactUs/>}/>
        <Route path = "our-services" element = {<Services/>}/>
        <Route path = "courses" element = {<Courses/>}/>
        <Route path = "quizzes" element = {<Quizzes/>}/>
        <Route path = "progress" element={<Progress/>}/>
        <Route path = "/python/content" element = {<PythonCourses/>}/>
        <Route path="/machine-learning/content" element={<MachineLearningCourses/>} />
        <Route path="/cpp/content" element={<CPPCourses/>} />
        <Route path="/java-script/content" element={<JavaScriptCourses/>} />
        <Route path = "/python/quiz" element = {<PythonQuizApp/>}/>
        <Route path = "/machine-learning/quiz" element = {<MachineLearningQuizApp/>}/>
        <Route path = "/java-script/quiz" element = {<JavaScriptQuizApp/>}/>
        <Route path = "/cpp/quiz" element = {<CPPQuizApp/>}/>
        <Route path = "/python/progress" element = {<PythonExamDashboard/>}/>
        <Route path = "/machine-learning/progress" element = {<MachineLearningExamDashboard/>}/>
        <Route path = "/CPP/progress" element = {<CPPExamDashboard/>}/>
        <Route path = "/java-script/progress" element = {<JavaScriptExamDashboard/>}/>
        <Route path = "/React-Js/content" element = {<ReactContent/>}/>
        <Route path = "/React-Js/quiz" element = {<ReactQuizApp/>}/>
        <Route path = "/React-Js/progress" element = {<ReactExamDashboard/>}/>
        <Route path = "/add-notes" element = {<NoteForm/>}/>
        <Route path = "/notes-list" element = {<NotesList/>}/>
        <Route path = "/notes/:id" element = {<NoteDetails/>}/>
        <Route path = "/collaborative-learning" element = {<CollaborativeLearning/>}/>
        <Route path = "/forgot-password" element = {<ForgotPassword/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
}

export default App