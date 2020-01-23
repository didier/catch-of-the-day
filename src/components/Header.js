import React from 'react'

const Header = ({ tagline, age }) => (
  <header className="top">
    <h1>Catch <span className="ofThe"><span className="of">of</span> <span className="the">the</span></span> Day</h1>
    <h3 className="tagLine">
      <span>{tagline}</span>
    </h3>
  </header>
)



// class Header extends React.Component {
//   render() {
//     return (

//     )
//   }
// }

export default Header