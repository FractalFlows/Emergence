/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Components
import App from './Components/App'
import ReportArticle from './Pages/Article/ReportArticle'
import EmptyScreen from './Components/EmptyScreen'
import Home from './Pages/Home'
import Article from './Pages/Article'
import Dashboard from './Pages/Dashboard'

injectTapEventPlugin()

export default function createRoutes() {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/article/report-article/:slug" component={ReportArticle}/>
            <Route path="/article/:slug" component={Article}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="*" component={EmptyScreen}/>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}
