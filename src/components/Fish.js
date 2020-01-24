import React, { Component } from 'react'
import { formatPrice } from '../helpers'
import PropTypes from 'prop-types'

class Fish extends Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  }
  render() {
    // Destructure details to separate variables
    const { image, name, price, desc, status } = this.props.details
    // Check availability
    const isAvailable = status === 'available'

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
          className="order">
          {isAvailable ? 'Add to order' : 'Sold out'}
        </button>
      </li>
    )
  }
}

export default Fish