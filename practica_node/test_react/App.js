import React from 'react';
const App = React.createClass({
 getInitialState() {
   return { num: Math.ceil(Math.random() * 6) };
 },
 getNumeroAleatorio() {
   this.setState({num:Math.ceil(Math.random() * 6)});
 },
 render() {
   return (
     <div>
       <p>{this.state.num}</p>
       <button onClick={this.getNumeroAleatorio}>Lanzar</button>
     </div>
   )
 }
});

export default App;