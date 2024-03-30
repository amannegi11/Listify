import { BrowserRouter,Route,Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import CheckList from "./components/CheckList"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PrivateRoute from "./components/PrivateRoute"
const App = () => {
  return (
    <div className="w-full min-h-screen h-full bg-gray-900">
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route
              path="/task"
              element={<PrivateRoute>
                <CheckList/>
           </PrivateRoute>}
            />
            <Route path="/login" element={<Login/>} />
            <Route path="/signUp" element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App