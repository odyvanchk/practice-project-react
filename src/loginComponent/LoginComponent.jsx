import { Component } from "react";
import { validateField } from '../utils/loginValidator';
import UserService from "../services/UserService";
import { FormErrors } from "../errorComponent/FormErrors";
import Cookies from 'universal-cookie';


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isEmailValid: false,
            password: '',
            isPasswordValid: false,
            isAllValid: false,
            formErrors: {email: '', password: ''},
            id:0
        }

        this.handleUserInput = this.handleUserInput.bind(this)
        this.validateField = validateField.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser = (e) => {
        e.preventDefault();
        let user = { password: this.state.password, email: this.state.email };
        UserService.loginUser(user )
    .then(res => {
        if (res.status === 200){
            const cookies = new Cookies();
            cookies.set('access', res.data.token, { path: '/', expires:new Date ( Number(res.data.expTime)) });
            alert("user logged in")
        }   
    })
    .catch(error => {
        if (error.response.status === 401 || error.response.status === 400 || error.response.status === 404 ){
            // eslint-disable-next-line array-callback-return
            Object.values(error.response.data.errors).map((message) => {
                console.log(message);
            });   
            alert("user don`t login. errors are in console")
        }
    
        if (error.response.status >= 500){
           alert("something happened on the server")
        }         
    });
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, 
                      () => { this.validateField(name, value) });
      }

    
      render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "rowFlex">
                            <FormErrors formErrors={this.state.formErrors} />
                            <div className = "myCard col-md-6 offset-md-3 offset-md-3">
                                Login
                                <div className = "card-body">
                                <div className="panel panel-default">
                                
                                </div>
                                    <form onChange={this.validAllFields}>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" type="email"
                                                value={this.state.email} onChange={this.handleUserInput}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Password: </label>
                                            <input placeholder="Password" name="password" className="form-control" type="password" 
                                                value={this.state.password} onChange={this.handleUserInput}/>
                                        </div>                            
                                        <button className="btn btn-success" disabled={!this.state.isAllValid} onClick={this.loginUser}>login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }


}

export default LoginComponent