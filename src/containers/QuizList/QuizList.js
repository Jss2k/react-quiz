import React, {Component} from 'react'
import styles from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
// import axios from '../../axios/axios-quiz'
import { connect } from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'

class QuizList extends Component {

  renderQuizes() {
    return this.props.quizes.map((quiz) => {
      return (
          <NavLink to={'/quiz/' + quiz.id} key={quiz.id}>
            <li>
              <h3>{quiz.title}</h3>
              <p>{quiz.subtitle}</p>
              <div className={styles.QuizCorner}>
              <div className={styles.QuizArrow}>
                →
              </div>
              </div>
            </li>
          </NavLink>
      )
    })
  }

  componentDidMount() {
    this.props.fetchQuizes()
  //   try {
  //     const response = await axios.get('/quizes.json')

  //     const quizes = []
  //     Object.keys(response.data).forEach((key, index) => {
  //       quizes.push({
  //         id: key,
  //         name: `Тест №${index + 1}`
  //       })
  //     })

  //     this.setState({
  //       quizes, loading: false
  //     })
  //   } catch (e) {
  //     console.log (e)
  //   }
  }

  render() {
    return (
      <div className={styles.QuizList}>
         <h1>Выберите онлайн-тест</h1>
          {
            this.props.loading && this.props.quizes.length !== 0 
              ? <Loader />
              : <ul>
              { this.renderQuizes() }
            </ul>
          }
      </div>
    )
  }
}

function mapStateToProps(state) {
return {
  quizes: state.quiz.quizes,
  loading: state.quiz.loading
}
}

function mapDispatchToPprops(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToPprops)(QuizList)
