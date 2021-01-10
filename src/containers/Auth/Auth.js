import React, {Component} from 'react'
import styles from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
// import axios from 'axios'
import is from 'is_js'
import {auth} from '../../store/actions/auth'
import { connect } from 'react-redux'

// function validateEmail(email) {
//   eslint-disable-next-line
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль(мин. 6 символов)',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
    this.setState({
      error: null
    })
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true
    // }
    // try {
    // const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxMII56u89O6ik2cafRRBAGwFGCIs-VSk', authData)

    // console.log(response.data)
    // } catch (e) {
    //   console.log(e)
    // }
    
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true
    // }
    // console.log(authData)
    // try {
    // const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxMII56u89O6ik2cafRRBAGwFGCIs-VSk', authData)
    // console.log(response.data)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
      if (!validation) {
        return true
      }

      let isValid = true

      if (validation.required) {
        isValid = value.trim() !== '' && isValid
      }

      if (validation.email) {
        isValid = is.email(value) && isValid
      }

      if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
      }

      return isValid
  }

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls}
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={styles.AuthForm}>
            
              {(this.props.error === 400)
                ? <div className={styles.AuthError}>
               Неверный логин или пароль. Проверьте ещё раз правильность введённых данных
                </div>
                : null}
            
            { this.renderInputs() }

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

