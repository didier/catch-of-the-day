import React, { Component } from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'
import PropTypes from 'prop-types'


class App extends Component {

  // Global State
  state = {
    fishes: {},
    order: {}
  }

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    // Sync state with firebase
    const { params } = this.props.match

    // Check if localstorage exists, else sync to this.state.
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    // Update localstorage with storeID and current order state
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    // Remove binding from firebase right before unmount to prevent memory leak
    base.removeBinding(this.ref)
  }

  addFish = fish => {

    // Copy fishes object
    const fishes = { ...this.state.fishes }

    // add new fish with timestamp as key
    fishes[`fish${Date.now()}`] = fish

    // push new fish to stat
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // 1. Copy current state
    const fishes = { ...this.state.fishes }
    // 2. Update that state
    fishes[key] = updatedFish
    // 3. Set that to state
    this.setState({ fishes })
  }

  deleteFish = (key) => {
    // Copy state
    const fishes = { ...this.state.fishes }
    // Update the state
    fishes[key] = null
    // 3. Set that to state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = (key) => {
    // Take a copy of State
    const order = { ...this.state.order }

    // Add to order OR increment order
    order[key] = order[key] + 1 || 1

    // Set to state
    this.setState({ order })

  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]} />
            ))}
          </ul>
        </div>

        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    )
  }
}

export default App