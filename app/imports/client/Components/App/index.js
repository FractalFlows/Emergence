/*
 * Built by Astrocoders
 * @flow
 */

import React, { PureComponent } from 'react'
import { get } from 'lodash/fp'
import Header from '../Header'
import Footer from '../Footer'
import Modal from '../Modal'

export default class App extends PureComponent {
  componentWillReceiveProps(nextProps){
    // check if the current route has changed
    // and if the new one is a modal
    if ((
      nextProps.location.key !== this.props.location.key &&
      // if the current route is already a modal we skip the
      // previousChildren change
      !get('modal', this.props.location.state) &&
      get('modal', nextProps.location.state)
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  }

  render(){
    const isModal = get('modal', this.props.location.state)

    return (
      <div>
        <Header />
        <div
          style={{
            marginTop: 65,
            minHeight: '100vh',
          }}
        >
          {
            isModal ?
            this.previousChildren :
            this.props.children
          }

          { isModal ? (
              <Modal>
                {this.props.children}
              </Modal>
            ) : null
          }
        </div>
        <Footer />
      </div>
    )
  }
}
