import { Component } from "react";
import UserService from "../services/UserService";
import "./HelloComponent.css"

class HelloComponent extends Component {
    constructor(props) {
        super(props);

        this.helloRole = this.helloRole.bind(this)
    }

    helloRole = (e) => {
        e.preventDefault();
        let prom;
        // eslint-disable-next-line default-case
        switch(e.target.id){
            case "student":
                prom = UserService.helloStudent;
                break;
            case "teacher":
                prom = UserService.helloTeacher;
                break;
        }
        prom()
    .then(res => {
        if (res.status === 200){
           alert(res.data)
        }   
    })
    .catch(error => {
        if (error.response.status === 401  || error.response.status === 404 || error.response.status === 400){
            // eslint-disable-next-line array-callback-return
            if (error.response.data.errors){
            Object.values(error.response.data.errors).map((message) => {
                console.log(message);
            });   
        }
            alert("user nedd to login. errors might be in console")
        }  
        if( error.response.status === 403) {
            alert("not enough access rights")
        }
        if (error.response.status >= 500){
           alert("something happened on the server")
        }         
    });
    }


    
      render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "rowFlex">
                            <div className = "myCard  offset-md-3 offset-md-3">
                                <button className="btn btn-secondary" id="teacher" onClick={this.helloRole}>teacher</button>
                                <button className="btn btn-secondary" id="student" onClick={this.helloRole}>student</button>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }


}

export default HelloComponent