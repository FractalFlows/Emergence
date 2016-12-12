import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { Accounts } from 'meteor/accounts-base'

if (!Meteor.users.find().count()){

const imadUser = Accounts.createUser({
  username: 'imad',
  email: 'imad.abdallah.81@gmail.com',
  password: '12341234',
  profile: {
    validator: true,
    firstName: "Imad",
    lastName: "Abdallah",
    phone: "11111",
  }
});

Roles.addUsersToRoles(imadUser, 'admin');

const peUser = Accounts.createUser({
  username: 'pe',
  email: 'pe@retho.re',
  password: '12341234',
  profile: {
    validator: true,
    firstName: "Pierre",
    lastName: "Abdallah",
    phone: "11111",
  }
});

Roles.addUsersToRoles(peUser, 'admin');

const gUser = Accounts.createUser({
  username: 'guilhermedecampo',
  email: 'guilhermedecampo@gmail.com',
  password: '12341234',
  profile: {
    validator: true,
    firstName: "Guilherme",
    lastName: "Decampo",
    phone: "11111",
  }
});

Roles.addUsersToRoles(gUser, 'admin');

console.log("Users Added");
}
