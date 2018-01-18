import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.stage = { edad:23 };
    this.changeEdad = this.changeEdad.bind(this);
  }

  changeEdad(e) {
    e.preventDefault();
    this.setState({edad:32});
  }
  render() {

    let nombre = this.props.nombre;
    return (
     <div>
          <h1 className="hello"> Hello Word! {nombre}edad:{this.stage.edad}</h1>
          <input onChange={this.changeEdad} />
     </div>
    );
  }


}



export default App;
