import React , {Component} from 'react';
import ListNombres from './ListNombres';

class NombresApi extends Component {
    
    constructor(props){
        super(props);
        this.state = {nombres:[],nombre :""};
    }

    componentWillMount() { // solo una vez se Ejecuta antes de rendedizar conf de App 
        fetch( 'https://swapi.co/api/people/?format=json' )
        .then( response => response.json())
        .then( result => this.setState({nombres:result.results.map(e => e.name)}));
    }

    filterName(e){
        this.setState({nombre:this.state.nombres.find(name => name.includes(e.target.value))})
    }
    
    render(){
        return <div><input type="text" onChange={this.filterName.bind(this)}/> {this.state.nombre}<hr></hr><ListNombres nombres={this.state.nombres}/></div>;
    }
}

export default NombresApi;