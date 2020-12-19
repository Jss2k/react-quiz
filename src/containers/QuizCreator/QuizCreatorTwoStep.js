import React, {Component} from 'react'
import styles from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import Textarea from '../../components/UI/Textarea/Textarea'
// import Textarea from '../../components/UI/Textarea/Textarea'
// import {createControl, validate, validateFrom} from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
// import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
// import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'
// import axios from '../../axios/axios-quiz'
// import { connect } from 'react-redux'

class QuizCreatorTwoStep extends Component {

  renderInputs(controlName) {
    // return Object.keys(this.props.formControls).map((controlName, index) => {
      const control = this.props.formControls[controlName]

      return (
        // <Auxiliary key={controlName + index}>
          <Input
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          errorMessage={control.errorMessage}
          onChange={event => this.props.changeHandler(event.target.value, controlName)}
        />
        // </Auxiliary>
      )
  }

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

  render() {
    const select = <Select
    label="Выберите правильный ответ"
    value={this.props.rightAnswerId}
    onChange={this.props.selectChangeHandler}
    options={[
      {text: 1, value: 1},
      {text: 2, value: 2},
      {text: 3, value: 3},
      {text: 4, value: 4}
    ]}
  />


    return (
      <div className={styles.QuizCreator}>
        <div>
           <h1>Создание теста. Шаг 2</h1>

          <form onSubmit={this.props.submitHandler}>

            { this.renderTextarea('question') }
            { this.renderInputs('option1') }
            { this.renderInputs('option2') }
            { this.renderInputs('option3') }
            { this.renderInputs('option4') }

                        { select }

            <Button
              type="primary"
              onClick={this.props.addQuestionHandler}
              // disabled={!this.props.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.props.createQuestionHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

export default connect(mapStateToProps)(QuizCreatorTwoStep)