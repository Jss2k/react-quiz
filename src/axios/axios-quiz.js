import axios from 'axios'

export default axios.create({
  baseURL: 'https://quiz-react-922ff-default-rtdb.firebaseio.com/'
})