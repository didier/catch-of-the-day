import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCxUZFQxfexWTWVL8tlBJlYXeILjtiJQlA",
  authDomain: "catz-cotd.firebaseapp.com",
  databaseURL: "https://catz-cotd.firebaseio.com",
  // projectId: "catz-cotd",
  // storageBucket: "catz-cotd.appspot.com",
  // messagingSenderId: "620625037709",
  // appId: "1:620625037709:web:894a1209a5804ac0aed5c4"
})

const base = Rebase.createClass(firebaseApp.database())

// Named export 
export { firebaseApp }

// This is a default export
export default base