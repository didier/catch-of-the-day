import React from 'react';
import { getFunName } from '../helpers';
// import { render } from 'react-dom';

class StorePicker extends React.Component {
  myInput = React.createRef()

  goToStore = event => {
    event.preventDefault()
    console.log('Going to store!');
    const storeName = this.myInput.current.value
    this.props.history.push(`/store/${storeName}`)


  }

  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store.</h2>
        <label htmlFor="store">
          <p> Enter Store Name</p>
        </label>
        <input
          type="text"
          ref={this.myInput}
          required
          name="store"
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default StorePicker;
