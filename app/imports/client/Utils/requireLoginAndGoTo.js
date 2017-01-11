import { browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'

export default function requireLoginAndGoTo(routeDef){
  if(Meteor.user()){
    browserHistory.push(routeDef)
  } else {
    browserHistory.push({
      pathname: 'login',
      state: { modal: true, redirTo: routeDef },
    })
  }
}
