import React, { Component } from 'react';




const Button = (props) => {
    return <button value={props.marca} onClick={props.manejador}> {(props.marca)?'on':'off'}</button>
}

class Interruptor extends Component {
    constructor (props){
        super(props);
        this.state={mensaja:null , marca:true};
        this.changeBoton = this.changeBoton.bind(this);
        }

        changeBoton(e){
            console.log("changeBoton")
               this.setState({ marca:!this.state.marca
               })
           
        }
    
    render() {
        
        if (this.props.value) {
            return <Button marca={this.state.marca} manejador={this.changeBoton} />
        }
        else {
            return <Button marca={this.state.marca} manejador={this.changeBoton} />
        }
    }
}

export default Interruptor;