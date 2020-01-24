import React, { Component } from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import PropTypes from 'prop-types'
import base, { firebaseApp } from '../base'
import firebase from 'firebase'

class Inventory extends Component {

  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired
  }


  state = { uid: null, owner: null }
  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this })
    console.log(store);

    // 2. Claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory to reflect the current user
    console.log(authData);
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    console.log('Logging out.')
    await firebase.auth().signOut()

    this.setState({ uid: null })
  };

  render() {
    const logout = <button onClick={this.logout}>Log out</button>

    // 1. Check if user is logged in.
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner.</p>
          {logout}
        </div>
      )
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish} />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )

  }
}

export default Inventory