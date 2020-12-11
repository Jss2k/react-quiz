import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-387a3-default-rtdb.firebaseio.com/'
})