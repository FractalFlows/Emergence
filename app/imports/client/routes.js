/**
 * built by Astrocoders
 * @flow
 */

// Modules
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Components
import App from './Components/App'
import ReportArticle from './Pages/Article/ReportArticle'
import EmptyScreen from './Components/EmptyScreen'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import TutorialVideo from './Components/TutorialVideo'
import Home from './Pages/Home'
import Article from './Pages/Article'
import InformationUpsert from './Pages/Article/InformationUpsert'
import SummaryUpsert from './Pages/Article/SummaryUpsert'
import Dashboard from './Pages/Dashboard'

injectTapEventPlugin()

const historyWithRedux = syncHistoryWithStore(browserHistory, store)

export default function createRoutes() {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={historyWithRedux}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/login" component={SignIn}/>
            <Route path="/sign-up" component={SignUp}/>
            <Route path="/tutorial-video" component={TutorialVideo}/>
            <Route path="/article/:slug" component={Article}/>
            <Route path="/article/report-article/:slug" component={ReportArticle}/>
            <Route path="/article/information-upsert/:slug" component={InformationUpsert}/>
            <Route path="/article/summary-upsert/:slug" component={SummaryUpsert}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="*" component={EmptyScreen}/>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  )
}
