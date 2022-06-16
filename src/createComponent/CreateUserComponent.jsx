import React, { Component } from 'react'
import UserService from '../services/UserService';
import { FormErrors } from '../errorComponent/FormErrors';
import { validateField } from '../utils/inputValidator';
import "./CreateUserComponent.css"

class CreateUserComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            isLoginValid: false,
            password: '',
            isPasswordValid: false,
            repeatPassword: '',
            passwordsMatches: false,
            email: '', 
            isEmailValid: false,
            isTeacher: false,
            isStudent:false,
            chooseAtLeastOneRole: false,
            isAllValid: false,
            formErrors: {email: '', password: '', match:'', role:'',login:''},
        }

        this.validateField = validateField.bind(this);
        // this.validAllFields = this.validAllFields.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
        this.handleUserInputCheckbox = this.handleUserInputCheckbox.bind(this)
        this.saveUser = this.saveUser.bind(this);
    }
    
    saveUser = (e) => {
        e.preventDefault();
        let user = {login: this.state.login, password: this.state.password, email: this.state.email, 
                    isTeacher : this.state.isTeacher, isStudent: this.state.isStudent};
        console.log('user => ' + JSON.stringify(user));

            UserService.createUser(user)
            .then(res => {
                if (res.status === 201){
                    console.log("user is registered")
                }   
            })
            .catch(error => {
                if (error.response.status === 400){
                    console.log(Object.keys(error.response.data));
                    Object.values(error.response.data).map((message) => {
                        console.log(message);
                    });   
                    alert("user isn`t registered. errors are in console")
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

      handleUserInputCheckbox (e) {
        const name = e.target.name;
        const value = e.target.checked;
        this.setState({[name]: value}, 
                      () => { this.validateField(name, value) });
      }

    // validAllFields = () => {
    //     this.setState({isAllValid: this.state.isLoginValid && this.state.isPasswordValid && 
    //                     this.state.passwordsMatches && this.state.isEmailValid && this.state.chooseAtLeastOneRole})
    // }


    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "rowFlex">
                            <FormErrors formErrors={this.state.formErrors} />
                            <div className = "myCard col-md-6 offset-md-3 offset-md-3">
                                Registration
                                <div className = "card-body">
                                <div className="panel panel-default">
                                
                                </div>
                                    <form onChange={this.validAllFields}>
                                        <div className = "form-group">
                                            <label> Login: </label>
                                            <input placeholder="Login" name="login" className="form-control" 
                                                value={this.state.login} onChange={this.handleUserInput}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Password: </label>
                                            <input placeholder="Password" name="password" className="form-control" type="password" 
                                                value={this.state.password} onChange={this.handleUserInput}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Repeat Password: </label>
                                            <input placeholder="Repeat Password" name="repeatPassword" className="form-control" type="password" 
                                                value={this.state.repeat_password} onChange={this.handleUserInput}/>
                                        </div>
                                        <div className="userRole">
                                        <input
                                            type="checkbox"
                                            id="teacherRole"
                                            name="isTeacher"
                                            value={this.state.isTeacher}
                                            onChange={this.handleUserInputCheckbox}
                                            />
                                            Teacher
                                        
                                        <input
                                            type="checkbox"
                                            id="studentRole"
                                            name="isStudent"
                                            value={this.state.isStudent}
                                            onChange={this.handleUserInputCheckbox}
                                            />
                                            Student
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" type="email"
                                                value={this.state.email} onChange={this.handleUserInput}/>
                                        </div>

                                        <button className="btn btn-success" disabled={!this.state.isAllValid} onClick={this.saveUser}>Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateUserComponent

