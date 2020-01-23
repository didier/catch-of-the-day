import React, { Component } from 'react'

class AddFishForm extends Component {
  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()


  createFish = event => {
    event.preventDefault()

    const fish = {
      nameRef: this.nameRef.current.value,
      priceRef: parseFloat(this.priceRef.current.value),
      statusRef: this.statusRef.current.value,
      descRef: this.descRef.current.value,
      imageRef: this.imageRef.current.value,
    }

    this.props.addFish(fish)
    event.currentTarget.reset()
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} required type="text" placeholder="Name" />
        <input name="price" ref={this.priceRef} required type="text" placeholder="Price" />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} required type="text" placeholder="Desc" />
        <input name="image" ref={this.imageRef} required type="text" placeholder="Image" />
        <button type="submit">+ Add fish</button>
      </form>
    )
  }
}

export default AddFishForm