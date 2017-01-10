/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'

// Components
import App from './Components/App'
import EmptyScreen from './Components/EmptyScreen'
import Home from './Pages/Home'
import Article from './Pages/Article'

export default function createRoutes() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/article/:slug" component={Article}/>
          <Route path="*" component={EmptyScreen}/>
        </Route>
      </Router>
    </Provider>
  )
}
