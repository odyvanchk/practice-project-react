import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CreateUserComponent from './createComponent/CreateUserComponent';


function App() {
  return (
    <div>
        <Router>        
                <div className="container">
                    <Routes> 
                          <Route path = "/users/new" element = {<CreateUserComponent/>}></Route>
                    </Routes>
                </div>
        </Router>
        <script crossOrigin="http://localhost:8080"></script>
    </div>
    
  );
}

export default App;
