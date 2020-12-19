import React from 'react'
import styles from './Textarea.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Textarea = props => {
  const inputType = props.type || 'text'
  const cls = [styles.Textarea]
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(props)) {
    cls.push(styles.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor="">{props.label}</label>
      <textarea 
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      <span>
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
      </span>
    </div>
  )
}

export default Textarea