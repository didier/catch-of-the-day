import React, { Component } from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'


class App extends Component {

  // Global State
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    // Sync state with firebase
    const { params } = this.props.match
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    console.log('Updated');
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
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
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    )
  }
}

export default App