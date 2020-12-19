import React, { Component } from 'react'
import styles from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
// import Input from '../../components/UI/Input/Input'
// import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Textarea from '../../components/UI/Textarea/Textarea'
// import Select from '../../components/UI/Select/Select'
// import {createControl, validate, validateFrom} from '../../form/formFramework'
// import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'
// import axios from '../../axios/axios-quiz'
// import { connect } from 'react-redux'



export class QuizCreatorOneStep extends Component {

  // renderTextarea() {
  //   return Object.keys(this.props.formControls).map((controlName, index) => {
  //     const control = this.props.formControls[controlName]
  //     if (index < 2)
  //    { return (
  //       <Auxiliary key={controlName + index}>
  //         <Textarea
  //         label={control.label}
  //         value={control.value}
  //         valid={control.valid}
  //         shouldValidate={!!control.validation}
  //         touched={control.touched}
  //         errorMessage={control.errorMessage}
  //         onChange={event => this.props.changeHandler(event.target.value, controlName)}
  //       />
  //       </Auxiliary>
  //     )}
  //     return ('')
  //   })
  // }

renderTextarea(controlName) {
  const control = this.props.formControls[controlName]

  return (
    <Textarea
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          errorMessage={control.errorMessage}
          onChange={event => this.props.changeHandler(event.target.value, controlName)}
        />
  )
}

  continue = e => {
    e.preventDefault()
    this.props.nextStep()
  }

  render() {
    return (
      <div className={styles.QuizCreator}>
        <div>
           <h1>Создание теста. Шаг 1</h1>

          <form onSubmit={this.props.submitHandler}>

          {this.renderTextarea('title')}
          {this.renderTextarea('subtitle')}

            <Button
              type="success"
              onClick={this.continue}
            >
              Далее
            </Button>
          </form>
        </div>
      </div>
    )
  }
}