import React, {Component} from 'react'
import styles from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import {Link} from 'react-router-dom'

export class QuizCreatorEndStep extends Component {

  back = e => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <div className={styles.QuizCreator}>
        <div className={styles.endStep}>
           <h1>Создание теста. Шаг 3</h1>
           <p>Отлично! Вы создали новый тест! </p>
           <p>Создайте ещё один или перейдите к выбору уже созданных тестов.</p>

           <Link to="/quiz-creator">
            <Button
              type="primary"
              onClick={this.back}
              >Создать новый тест</Button>
            </Link>
        <Link to="/">
          <Button type="success">Выбрать онлайн-тест</Button>
        </Link>

        </div>
      </div>
    )
  }
}
