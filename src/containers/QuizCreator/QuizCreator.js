import React, {Component} from 'react'
import {createControl, validate, validateFrom} from '../../form/formFramework'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'
import { connect } from 'react-redux'
import {QuizCreatorOneStep} from './QuizCreatorOneStep'
import QuizCreatorTwoStep from './QuizCreatorTwoStep'
import {QuizCreatorEndStep} from './QuizCreatorEndStep'

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {required: true})
}

function createFormInputs() {
  return {
    title: createControl({
      label: 'Введите название опроса',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    subtitle: createControl({
      label: 'Введите краткое описание',
      errorMessage: 'Описание не может быть пустым'
    }, {required: true}),
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}
class QuizCreator extends Component {

  state = {
    step: 1,
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormInputs(),
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 2
    })
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = (event) => {
    event.preventDefault()

    // const quiz = this.state.quiz.concat()
    // const index = quiz.length + 1

    const {title, subtitle, question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      title: title.value,
      subtitle: subtitle.value,
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    // quiz.push(questionItem)
     this.props.createQuizQuestion(questionItem)

    this.setState({
      // quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormInputs(),
    })
  }

  createQuestionHandler = (event) => {
    event.preventDefault()
    const { step } = this.state;
    // try {
      // axios.post('/quizes.json', this.state.quiz)
      
      this.setState({
        step: step + 1,
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormInputs(),
      })
      this.props.finishCreateQuiz()

    // } catch (e) {
    //   console.log(e)
    // }

  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(error => console.log(error))
  //   console.log(this.state.quiz)
  }

  changeHandler = (value, controlName) => {

    const formControls = { ...this.state.formControls}
    const control = { ...formControls[controlName] }


    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateFrom(formControls)
    })
  }





  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  render() {
    const { step } = this.state

    switch(step) {
      case 1:
        return (
          <QuizCreatorOneStep
            nextStep={this.nextStep}
            changeHandler={this.changeHandler}
            formControls={this.state.formControls}
            submitHandler={this.submitHandler}
  
          />
        )
        case 2:
          return (
            <QuizCreatorTwoStep
            nextStep={this.nextStep}
            changeHandler={this.changeHandler}
            formControls={this.state.formControls}
            submitHandler={this.submitHandler}
            addQuestionHandler={this.addQuestionHandler}
            createQuestionHandler={this.createQuestionHandler}
            rightAnswerId={this.state.rightAnswerId}
            selectChangeHandler={this.selectChangeHandler}
          />
          )
        case 3:
          return (
            <QuizCreatorEndStep
            prevStep={this.prevStep}
          />
          )
          default:
            console.log("Sorry, we are out of ")
    }
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
