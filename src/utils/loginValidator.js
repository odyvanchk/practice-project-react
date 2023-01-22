export function validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.isEmailValid;
    let passwordValid = this.state.isPasswordValid;

    
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/.+@.+\.[a-zA-Z0-9]+/i)? true: false;
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 8 && value.length <=20 && (value.match(/[a-zA-Z0-9]+/i) ? true: false);
        fieldValidationErrors.password = passwordValid ? '': 'between 8-20, contain a-z, A-Z, 0-9';  
      // eslint-disable-next-line no-fallthrough
      default:
        break;
    }

    
    this.setState({formErrors: fieldValidationErrors,
                    isEmailValid: emailValid,
                    isPasswordValid: passwordValid,
                    isAllValid: emailValid && passwordValid
                  });
  }