export function validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.isEmailValid;
    let passwordValid = this.state.isPasswordValid;
    let repPassw = this.state.passwordsMatches;
    let haveOneRole = this.state.chooseAtLeastOneRole;
    let loginValid = this.state.isLoginValid;
    
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/.+@.+\.[a-zA-Z0-9]+/i)? true: false;
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8 && value.length <=20 && (value.match(/[a-zA-Z0-9]+/i) ? true: false);
        fieldValidationErrors.password = passwordValid ? '': 'between 8-20, contain a-z, A-Z, 0-9';
      // eslint-disable-next-line no-fallthrough
      case 'repeatPassword':
        repPassw = this.state.password === this.state.repeatPassword;
        fieldValidationErrors.match =repPassw ? '': 'passwords don`t match';
        break;
      case 'isStudent':
      case 'isTeacher':
        haveOneRole = this.state.isStudent || this.state.isTeacher;
        fieldValidationErrors.role = haveOneRole ? '': 'choose at least one role';
        break;
      case 'login':
          loginValid = value.length >= 4 && value.length <=15;
          fieldValidationErrors.login = loginValid ? '': 'between 4-15';
          break;  
      default:
        break;
    }

    
    this.setState({formErrors: fieldValidationErrors,
                    isEmailValid: emailValid,
                    isPasswordValid: passwordValid,
                    isLoginValid: loginValid,
                    passwordsMatches: repPassw,
                    chooseAtLeastOneRole: haveOneRole,
                    isAllValid: emailValid && passwordValid && loginValid && repPassw && haveOneRole
                  });
  }