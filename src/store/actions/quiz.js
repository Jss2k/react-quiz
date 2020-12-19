import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ
} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json')
      
      const quizes = []
      Object.entries(response.data).forEach((obj) => {
        quizes.push({
          id: `${obj[0]}`,
          title: `${obj[1][0].title}`,
          subtitle: `${obj[1][0].subtitle}`
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data

      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz


    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if(question.rightAnswerId === answerId) {
      if(!results[question.id]) {
        results[question.id] = 'success'
      }

    dispatch(quizSetState({[answerId]: 'success'}, results))
      // this.setState({
      //   answerState: {[answerId]: 'success'},
      //   results
      // })
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
      // this.setState({
      //   answerState: {[answerId]: 'error'},
      //   results
      // })
    }
    const timeout = window.setTimeout(() => {
      if(isQuizFinished(state)) {
        dispatch(finishQuiz())
        // this.setState({
        //   isFinished: true
        // })
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1))
        // this.setState({
        //   activeQuestion: this.state.activeQuestion + 1,
        //   answerState: null
        // })
      }
        window.clearTimeout(timeout)
    }, 500)
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}