import React from 'react'
import styles from './AnswerItem.module.css'

const AnswerItem = props => {
  const cls = [styles.AnswerItem]
  if (props.state) {
    cls.push(styles[props.state])
  }
  if (props.answer.text.length !== 0) {
    return (
      <li
        className={cls.join(' ')}
        onClick={() => props.onAnswerClick(props.answer.id)}
      >
        { props.answer.text }
      </li>
    )
  }
  return (
    <li></li>
  )
}

export default AnswerItem