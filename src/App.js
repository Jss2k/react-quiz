import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {

    let routes = (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={450}
            classNames="fade"
          >
            <Switch location={location}>
              <Route path="/auth" component={Auth} />
              <Route path="/quiz/:id" component={Quiz} />
              <Route path="/" exact component={QuizList} />
              <Redirect to="/" />
            </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch location={location}>
                <Route path="/quiz-creator" component={QuizCreator} />
                <Route path="/quiz/:id" component={Quiz} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={QuizList} />
                <Redirect to="/" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      )
    }

    return (
      <Layout>
              { routes }
      </Layout>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
