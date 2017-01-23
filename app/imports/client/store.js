/**
 * built by Astrocoders
 * @flow
 */

import { applyMiddleware, compose, createStore } from 'redux'
import { createLogicMiddleware } from 'redux-logic'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import rootReducers from './reducers'
import rootLogics from './logics'

const logicMiddleware = createLogicMiddleware(rootLogics)

const middlewares = [
  logicMiddleware,
  routerMiddleware(browserHistory),
]

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */


const enhancer = composeEnhancers(...[applyMiddleware(...middlewares)])

const store = createStore(rootReducers, enhancer)

export default store

