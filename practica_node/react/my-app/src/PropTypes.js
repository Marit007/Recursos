import React, { Component } from 'react';
class Test extends Component{

    render(){
            return <div> {this.props.dato}</div>
    }


}
// validacion de TYPO solo en modo de desarrollo lo verifica por cuestiones de rendermiento
//




Test.defaultProps = {
   dato: 'Default'
  };
  

export default Test;