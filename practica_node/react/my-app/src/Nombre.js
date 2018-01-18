import React from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';

class Nombre extends React.Component {
    constructor(props) {
        super(props);
        this.changeNombre = this.changeNombre.bind(this);
        this.state = { nombre: '' };
    }

    changeNombre(e) {
        e.preventDefault();
        this.setState({ nombre: e.target.value });
    }
    render() {
        let apellido = this.props.apellido;
        return <div>
            <Widget changeNombre={this.changeNombre} />
            <div>Nombre:{this.state.nombre}</div>
            <div>Apellido:{apellido}</div>
            <div>Mascota:{this.props.mascota}</div>
            <Parrafo> <Clock /> </Parrafo>
        </div>
    }
}

const Widget = (props) => {
    return <input id='nombre' type='text' onChange={props.changeNombre} />
}

const Parrafo = (props) => {
    return <p> La hora es {props.children}.  </p>
}
Nombre.propTypes = {
    apellido: function (props, propName, component) {
        console.log(propName)
        if (!(propName in props)) {
            return new Error(`missing ${propName}`)
        }
        if (props[propName].length < 6) {
            return new Error(`${propName} was too short`)
        }
    },
    mascota: function (props, propName, component) {
        if(props[propName]==='gato'){
            return new Error("No se admiten gatos");
        }
    }
};

Nombre.defaultProps = {
    apellido: "NNNNNN",
}




export default Nombre;