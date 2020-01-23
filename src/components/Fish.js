import React, { Component } from 'react'
import { formatPrice } from '../helpers'
class Fish extends Component {
  render() {
    const index = this.props.index
    const { image, name, price, desc, status } = this.props.details
    const isAvailable = status === 'available'

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          onClick={this.props.addToOrder(index)}
          disabled={!isAvailable}
          className="order">
          {isAvailable ? 'Add to order' : 'Sold out'}
        </button>
      </li>
    )
  }
}

export default Fish