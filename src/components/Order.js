import React, { Component } from 'react'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

class Order extends Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = (key) => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const isAvailable = fish && fish.status === 'available'

    const trasitionOptions = {
      classNames: "order",
      key,
      timeout: {
        enter: 500, exit: 500
      }
    }
    // Make sure fish is loaded before we render unavailable
    if (!fish) return null

    if (!isAvailable) {
      return (
        <CSSTransition {...trasitionOptions}>
          <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available.</li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...trasitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count" >
              <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }} >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            kg {fish.name}

            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
          </button>
          </span>
        </li>
      </CSSTransition>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'

      if (isAvailable) {
        return prevTotal + count * fish.price
      }

      return prevTotal
    }, 0)

    return (
      <div className="order">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="order-total">
          Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order