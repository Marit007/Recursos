import React , {Component} from 'react';

const Nombres=(props)=>{
    return <ul>{props.nombres.map((e)=> <li key={e}> {e} </li>)}</ul>;
}

class ListNombres extends Component {
    render(){
        return <Nombres nombres={this.props.nombres} />;
    }
}

export default ListNombres;