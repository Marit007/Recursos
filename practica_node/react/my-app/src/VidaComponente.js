import React,  { Component } from 'react';
import ReactDOM from 'react-dom';

// Las actualizaciones de state puedne ser asincronicas OJO

class VidaComponentes extends Component {

    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.contador = this.contador.bind(this);
    }
    componentWillMount() { // solo una vez se Ejecuta antes de rendedizar conf de App 
        console.log("componentWillMount");
    }
    
    componentDidMount(){ // ya esta el DOM , llmadas ajax Primera Vez
        console.log("componentDidMount");
    }
    
    componentWillUnmount(){                        /*Aquí puede cancelar cualquier solicitud de red saliente o eliminar                                               todos los detectores de eventos asociados con el componente*/
        console.log("componentWillUnmount");
    }
    
    
    componentWillReceiveProps(nextProps){ // Antes de recibir nuevos props
        console.log("componentWillReceiveProps");

    }
    
    shouldComponentUpdate(nextProps, nextState) { // cambios props y state anrtes de renderizar buen lugar para optimizacion
        console.log("shouldComponentUpdate");
        return (nextState.count !== 5); // no renderiza el por el count 5
    }
    
    componentDidUpdate(prevProps, prevState){ // despues del Render , actualizado 
        console.log("componentDidUpdate");
    }
    
    contador() {
        this.setState({ count: this.state.count + 1 });
    }
    render() { 
        console.log("render");
        return <button onClick = {this.contador}>{this.state.count}</button>
    }
}
class Wrapper extends Component {
    
    mount(){
        ReactDOM.render(<VidaComponentes />, document.getElementById('contador'));                
         }
        
        unMount(){
            ReactDOM.unmountComponentAtNode(document.getElementById('contador'))
        }
        render(){
            return <div>
                        <button onClick ={this.unMount.bind(this)}> Desmontar </button>
                        <button onClick ={this.mount.bind(this)}> Montar </button>
                        <div id='contador'></div>
                   </div>
        }
    }

export default Wrapper;