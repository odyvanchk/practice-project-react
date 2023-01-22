import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CreateUserComponent from './createComponent/CreateUserComponent';
import LoginComponent from './loginComponent/LoginComponent';
import HelloComponent from './helloComponent/HelloComponent';
// import { useHistory } from "react-router-dom";

function App() {
  // let history = useHistory();
  return (
    <div>
        <Router>        
                <div className="container">
                    <Routes> 
                          <Route path = "/users/new" element = {<CreateUserComponent/>}></Route>
                          <Route path='/users/login' element = {<LoginComponent/>}></Route>
                          <Route path='/hello' element = {<HelloComponent/>}></Route>
                    </Routes>
                </div>
        </Router>
        <script crossOrigin="http://localhost:8080"></script>
    </div>
    
  );
}

export default App;
