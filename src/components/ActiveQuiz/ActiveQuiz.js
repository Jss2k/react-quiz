import React from 'react'
import styles from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => (
  <div className={styles.ActiveQuiz}>
    <p className={styles.Question}>
        {props.question}
    </p>

  <AnswersList
    state={props.state}
    answers={props.answers}
    onAnswerClick={props.onAnswerClick}
  />
    <p className={styles.QuestionNumber}>
      Вопрос {props.answerNumber} из {props.quizLength}
    </p>

  </div>
)

export default ActiveQuiz