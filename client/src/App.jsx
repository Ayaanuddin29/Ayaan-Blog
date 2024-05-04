import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import About from "./pages/About"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import CreatePost from "./pages/CreatePost"
export default function App() {
  return (
    <div>
     <BrowserRouter>
       <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/sign-in' element={<Signin/>}></Route>
        <Route path='/sign-up' element={<Signup/>}></Route>
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePost/>}></Route>
        </Route>
        <Route path='/about' element={<About/>}></Route>
        <Route></Route>
      </Routes>
      <Footer/>
     </BrowserRouter>
    </div>
  )
}

