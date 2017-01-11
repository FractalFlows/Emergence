import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { browserHistory } from 'react-router'

export default function requireLoginBefore(fn){
  if(!Meteor.user()){
    browserHistory.push({
      pathname: '/login',
      state: { modal: true },
    })
  }

  Tracker.autorun(c => {
    if(Meteor.user()){
      fn()
      c.stop()
    }
  })
}
